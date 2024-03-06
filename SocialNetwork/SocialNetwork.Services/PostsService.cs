namespace SocialNetwork.Services
{
    using Microsoft.EntityFrameworkCore;
    using SocialNetwork.Data;
    using SocialNetwork.Services.Contracts;
    using SocialNetwork.Web.ViewModels.Post;
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
    }
}
