namespace SocialNetwork.Services
{
    using Microsoft.EntityFrameworkCore;
    using SocialNetwork.Data;
    using SocialNetwork.Data.Models;
    using SocialNetwork.Services.Contracts;
    using SocialNetwork.Web.ViewModels.Post;
    using System.Collections.Generic;
    using System.Runtime.CompilerServices;
    using System.Threading.Tasks;

    public class PostsService : IPostsService
    {
        private readonly ApplicationDbContext dbContext;

        public PostsService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<PostViewModel> GetByIdAsync(string id)
        {
            var post = await this.dbContext.Posts
                .Include(p => p.User)
                .ThenInclude(u => u.UserImages)
                //.Include(p => p.Comments)
                //.ThenInclude(c => c.Children)
                //.Include(p => p.Images)
                .Include(p => p.Votes)
                .Include(p => p.FavoritePosts)
                .Include(p => p.Images)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (post is null || post.IsDeleted)
            {
                throw new ArgumentException("Post not found.");
            }


            var viewModel = new PostViewModel
            {
                PostId = post.Id,
                CreatedOn = post.CreatedOn,
                ModifiedOn = post.ModifiedOn,
                DeletedOn = post.DeletedOn,
                IsDeleted = post.IsDeleted,
                Title = post.Title,
                Content = post.Content,
                UserUserName = post.User.UserName,
                UserId = post.User.Id,
                VotesCount = post.Votes.Count,
                FavoritesCount = post.FavoritePosts.Count,
                Images = post.Images.Select(i => new ImagesViewModel
                {
                    Id = i.Id,
                    PostId = post.Id,
                    ImageUrl = i.Content
                }).ToArray()
            };

            return viewModel;
        }

        public async Task<IEnumerable<PostViewModel>> GetPostsAsync(string userId)
        {
            var userFollowings = await this.dbContext
                .UserFollowers
                .Where(uf => uf.FollowerId == userId && !uf.IsDeleted)
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .ThenInclude(p => p.Votes)
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .ThenInclude(p => p.Comments)
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .ThenInclude(p => p.Images)
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .ThenInclude(p => p.FavoritePosts)
                .ToArrayAsync();

            ICollection<PostViewModel> posts = new HashSet<PostViewModel>();

            foreach (var userFollowing in userFollowings)
            {
                var currentFollowingPosts = userFollowing.User.Posts.Where(p => !p.IsDeleted);

                foreach (var post in currentFollowingPosts)
                {
                    posts.Add(new PostViewModel
                    {
                        PostId = post.Id,
                        Title = post.Title,
                        CreatedOn = post.CreatedOn,
                        ModifiedOn = post.ModifiedOn,
                        IsDeleted = post.IsDeleted,
                        DeletedOn = post.DeletedOn,
                        Content = post.Content,
                        UserUserName = post.User.UserName,
                        UserId = post.UserId,
                        IsVoted = post.Votes.Any(v => v.UserId == userId),
                        IsUpVote = post.Votes.Any(v => v.UserId == userId && v.VoteType == Data.Models.Enums.VoteType.UpVote),
                        VotesCount = post.Votes.Count,
                        IsFavourite = post.FavoritePosts.Any(x => x.UserId == userId),
                        FavoritesCount = post.FavoritePosts.Count(),
                        Images = post.Images.Select(i => new ImagesViewModel
                        {
                            Id = i.Id,
                            PostId = post.Id,
                            ImageUrl = i.Content
                        }).ToArray()
                    });
                }
            }

            return posts.OrderByDescending(x => x.CreatedOn);
        }

        public async Task<string> CreateAsync(CreatePostViewModel input, string userId)
        {
            var post = new Post
            {
                Content = input.Content,
                Title = input.Title,
                UserId = userId,
            };

            if (input.Images.Any())
            {

                foreach (var image in input.Images)
                {
                    using (var stream = new MemoryStream())
                    {
                        await image.CopyToAsync(stream);
                        post.Images.Add(new Image { Content = stream.ToArray(), Post = post, UserId = userId });
                    }
                }
            }

            await this.dbContext.Posts.AddAsync(post);
            await this.dbContext.SaveChangesAsync();
            return post.Id;
        }

        public async Task<string> EditAsync(EditPostViewModel input, string userId)
        {
            var post = await this.dbContext.Posts.FirstOrDefaultAsync(p => p.Id == input.Id);

            if (post == null || post.UserId != userId)
            {
                throw new ArgumentException("Post not found.");
            }

            post.Title = input.Title;
            post.Content = input.Content;
            post.ModifiedOn = DateTime.UtcNow;

            this.dbContext.SaveChanges();

            return post.Id;
        }

        public async Task SoftDeleteAsync(string postId, string userId)
        {
            var post = await this.dbContext.Posts.FirstOrDefaultAsync(x => x.Id == postId && !x.IsDeleted);

            if (post == null)
            {
                throw new ArgumentException("Post not found.");
            }
            if (post.UserId != userId)
            {
                throw new ArgumentException("No permissions to delete this posts.");
            }
            post.IsDeleted = true;
            post.DeletedOn = DateTime.UtcNow;

            await this.dbContext.SaveChangesAsync();
        }

        public async Task<bool> AddToFavouriteAsync(string postId, string userId)
        {
            var post = await this.dbContext
                .FavoritePosts
                .FirstOrDefaultAsync(x => x.PostId == postId && x.UserId == userId);

            if (post != null)
            {
                this.dbContext.FavoritePosts.Remove(post);
                await this.dbContext.SaveChangesAsync();

                return false;
            }

            this.dbContext.FavoritePosts.Add(new FavoritePost { PostId = postId, UserId = userId });
            await this.dbContext.SaveChangesAsync();

            return true;
        }

        public async Task<int> GetFavouritesCountAsync(string postId)
        {
            return await this.dbContext.FavoritePosts.CountAsync(x => x.PostId == postId);
        }
    }
}
