using Microsoft.EntityFrameworkCore;
using SocialNetwork.Data;
using SocialNetwork.Data.Models;
using SocialNetwork.Data.Models.Enums;
using SocialNetwork.Services.Contracts;
using SocialNetwork.Web.ViewModels.Post;
using SocialNetwork.Web.ViewModels.User;

namespace SocialNetwork.Services
{
    public class UsersService : IUsersService
    {
        private readonly ApplicationDbContext dbContext;

        public UsersService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<string> EditUserAsync(AuthUserViewModel viewModel)
        {
            var user = await this.dbContext
                .Users
                .Include(u => u.UserImages)
                .FirstOrDefaultAsync(u => u.Id == viewModel.Id);

            if (user == null)
            {
                throw new ArgumentException("User not found.");
            }

            user.UserName = viewModel.UserName;

            using (var stream = new MemoryStream())
            {
                await viewModel.Image.CopyToAsync(stream);
                user.UserImages.Add(new UserImage { Content = stream.ToArray(), UserId = user.Id, IsProfileImage = true });
            }
            await this.dbContext.SaveChangesAsync();

            return user.Id;
        }

        public async Task<IEnumerable<PostViewModel>> GetFavouritePostsAsync(string userId)
        {
            var posts = await this.dbContext
                .FavoritePosts
                .Include(fp => fp.Post)
                .ThenInclude(p => p.Votes)
                .Include(fp => fp.Post)
                .ThenInclude(p => p.Comments)
                .Include(fp => fp.Post)
                .ThenInclude(p => p.Images)
                .Include(fp => fp.User)
                .ThenInclude(u => u.UserImages)
                .Where(fp => fp.UserId == userId).Select(fp => new PostViewModel
                {
                    UserId = fp.User.Id,
                    UserUserName = fp.User.UserName,
                    UserProfileImageUrl = fp.User.UserImages.FirstOrDefault(i => i.IsProfileImage).Content,
                    PostId = fp.Post.Id,
                    Title = fp.Post.Title,
                    Content = fp.Post.Content,
                    CreatedOn = fp.Post.CreatedOn,
                    ModifiedOn = fp.Post.ModifiedOn,
                    Images = fp.Post.Images
                      .Select(i => new ImagesViewModel
                      {
                          Id = i.Id,
                          ImageUrl = i.Content,
                          PostId = i.PostId
                      }),
                    VotesCount = fp.Post.Votes.Sum(v => (int)v.VoteType),
                    IsFavourite = true,
                    IsVoted = fp.Post.Votes.Any(v => v.UserId == userId),
                    IsUpVote = fp.Post.Votes.Any(v => v.UserId == userId && v.VoteType == VoteType.UpVote),
                    IsOwner = fp.Post.UserId == userId,
                    FavoritesCount = fp.Post.FavoritePosts.Count(),
                })
                .ToArrayAsync();

            return posts;
        }

        public async Task<UserViewModel> GetUserAsync(string userId)
        {
            var user = await this.dbContext
                .Users
                .Include(u => u.Posts)
                .Include(u => u.UserImages)
                .Include(u => u.Followings)
                .FirstOrDefaultAsync(u => u.Id == userId);

            if (user == null)
            {
                throw new ArgumentException("User doesn't exist.");
            }

            var viewModel = new UserViewModel
            {
                UserId = user.Id,
                ProfileImageUrl = user.UserImages.FirstOrDefault(x => x.IsProfileImage)?.Content,
                UserEmail = user.Email,
                UserUserName = user.UserName,
                CreatedOn = user.CreatedOn.ToString("D"),
                UserPostsCount = user.Posts.Count(p => !p.IsDeleted),
                UserFollowingsCount = dbContext.UserFollowers.Count(uf => uf.FollowerId == user.Id),
                UserFollowersCount = user.Followings.Count(uf => uf.UserId == user.Id),
                UserPosts = user.Posts.Where(p => !p.IsDeleted).Select(p => new PostViewModel
                {
                    PostId = p.Id,
                    Title = p.Title,
                    Content = p.Content,
                    CreatedOn = p.CreatedOn,
                    ModifiedOn = p.ModifiedOn,
                    UserUserName = user.UserName,
                    UserId = user.Id
                })
            };

            return viewModel;
        }

        public async Task<IEnumerable<UserViewModel>> GetUserFollwers(string userId)
        {
            var userFollowers = await this.dbContext
                .UserFollowers
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .Where(uf => uf.UserId == userId)
                .Select(uf => new UserViewModel
                {
                    UserId = uf.FollowerId,
                    UserEmail = uf.Follower.Email,
                    UserUserName = uf.Follower.UserName,
                })
                .ToArrayAsync();

            return userFollowers;
        }

        public async Task<IEnumerable<UserViewModel>> GetUserFollwings(string userId)
        {
            var userFollowings = await this.dbContext
                .UserFollowers
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .Where(uf => uf.FollowerId == userId && !uf.IsDeleted)
                .Select(uf => new UserViewModel
                {
                    UserId = uf.User.Id,
                    UserEmail = uf.User.Email,
                    UserUserName = uf.User.UserName,
                }).ToArrayAsync();

            return userFollowings;
        }

        public async Task<IEnumerable<UserViewModel>> GetUsersAsync()
        {
            var users = await this.dbContext
                .Users
                .Include(u => u.Followings)
                .Include(u => u.Posts)
                .Select(u => new UserViewModel
                {
                    UserId = u.Id,
                    UserEmail = u.Email,
                    UserUserName = u.UserName,
                    UserFollowingsCount = dbContext.UserFollowers.Count(uf => uf.FollowerId == u.Id),
                    UserFollowersCount = u.Followings.Count(uf => uf.UserId == u.Id),
                    UserPostsCount = u.Posts.Count(p => !p.IsDeleted),
                })
                .ToArrayAsync();

            return users;
        }

        public async Task<IEnumerable<UserViewModel>> GetUsersByUsernameAsync(string? username)
        {
            if (username == null)
            {
                return Enumerable.Empty<UserViewModel>();
            }

            var users = await this.dbContext
                .Users
                .Include(u => u.Followings)
                .Include(u => u.UserImages)
                .Include(u => u.Posts)
                .Where(u => u.UserName.ToUpper().Contains(username.ToUpper()))
                .Select(u => new UserViewModel
                {
                    UserId = u.Id,
                    UserEmail = u.Email,
                    UserUserName = u.UserName,
                    ProfileImageUrl = u.UserImages.FirstOrDefault(x => x.IsProfileImage).Content,
                    UserFollowingsCount = dbContext.UserFollowers.Count(uf => uf.FollowerId == u.Id),
                    UserFollowersCount = u.Followings.Count(uf => uf.UserId == u.Id),
                    UserPostsCount = u.Posts.Count(p => !p.IsDeleted),

                })
                .ToArrayAsync();

            return users;
        }

        public async Task ManageSubscriptionAsync(string userId, string followingId)
        {
            var user = await this.dbContext.Users.FirstOrDefaultAsync(x => x.Id == userId);
            var followedUser = await dbContext.Users.FirstOrDefaultAsync(x => x.Id == followingId);
            var userFollowerRelation = await dbContext.UserFollowers.FirstOrDefaultAsync(uf => uf.UserId == followingId && uf.FollowerId == userId);

            if (user is null || followedUser is null)
            {
                throw new ArgumentException("User not found.");
            }

            if (userFollowerRelation is not null)
            {
                if (userFollowerRelation.IsDeleted == false)
                {
                    userFollowerRelation.IsDeleted = true;
                    userFollowerRelation.DeletedOn = DateTime.UtcNow;
                }
                else
                {
                    userFollowerRelation.IsDeleted = false;
                    userFollowerRelation.DeletedOn = null;
                }
            }
            else
            {
                user.Followings.Add(new UserFollower { UserId = followedUser.Id, FollowerId = user.Id });
            }
            await this.dbContext.SaveChangesAsync();
        }
    }
}
