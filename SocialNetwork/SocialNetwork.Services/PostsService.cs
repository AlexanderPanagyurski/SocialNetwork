namespace SocialNetwork.Services
{
    using Microsoft.EntityFrameworkCore;
    using SocialNetwork.Data;
    using SocialNetwork.Data.Models;
    using SocialNetwork.Services.Contracts;
    using SocialNetwork.Web.ViewModels.Post;
    using System.Collections.Generic;
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
                .FirstOrDefaultAsync(x => x.Id == id);

            if (post is null)
            {
                throw new ArgumentException("Post wasn't found.");
            }


            var viewModel = new PostViewModel
            {
                Id = post.Id,
                CreatedOn = post.CreatedOn,
                Title = post.Title,
                Content = post.Content,
                UserUserName = post.User.UserName,
            };

            return viewModel;
        }

        public async Task<IEnumerable<PostViewModel>> GetPostsAsync(string userId)
        {
            var userFollowings = await this.dbContext
                .UserFollowers
                .Where(uf => uf.FollowerId == userId)
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .ThenInclude(p => p.Votes)
                .Include(uf => uf.User)
                .ThenInclude(u => u.Posts)
                .ThenInclude(p => p.Comments)
                .ToArrayAsync();

            ICollection<PostViewModel> posts = new HashSet<PostViewModel>();

            foreach (var userFollowing in userFollowings)
            {
                var currentFollowingPosts = userFollowing.User.Posts;

                foreach (var post in currentFollowingPosts)
                {
                    posts.Add(new PostViewModel
                    {
                        Id = post.Id,
                        Title = post.Title,
                        CreatedOn = post.CreatedOn,
                        Content = post.Content,
                        IsOwner = post.UserId == userId,
                        UserUserName = post.User.UserName,
                        VotesCount = post.Votes.Count,
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

            await this.dbContext.Posts.AddAsync(post);
            await this.dbContext.SaveChangesAsync();
            return post.Id;
        }
    }
}
