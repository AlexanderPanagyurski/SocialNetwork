using Microsoft.EntityFrameworkCore;
using SocialNetwork.Data;
using SocialNetwork.Data.Models;
using SocialNetwork.Services.Contracts;
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

        public async Task<IEnumerable<UserViewModel>> GetUserFollwers(string userId)
        {
            var userFollowers = await this.dbContext
                .UserFollowers
                .Include(uf => uf.Follower)
                .Where(uf => uf.UserId == userId)
                .Select(f => new UserViewModel
                {
                    UserId = f.UserId,
                    UserEmail = f.Follower.Email,
                    UserUserName = f.Follower.UserName,
                })
                .ToArrayAsync();

            return userFollowers;
        }

        public async Task<IEnumerable<UserViewModel>> GetUserFollwings(string userId)
        {
            var userFollowings = await this.dbContext
                .UserFollowers
                .Include(uf=>uf.User)
                .Where(uf => uf.FollowerId == userId && !uf.IsDeleted)
                .Select(x => new UserViewModel
                {
                    UserId = x.User.Id,
                    UserEmail = x.User.Email,
                    UserUserName = x.User.UserName
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
