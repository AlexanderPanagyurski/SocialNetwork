using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Services.Contracts;
using SocialNetwork.Web.ViewModels.Post;

namespace SocialNetwork.WebApi.Controllers
{
    [Authorize]
    public class PostsController : BaseApiController
    {
        private readonly IPostsService postsService;

        public PostsController(IPostsService postsService)
        {
            this.postsService = postsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPostsAsync()
        {
            var userId = string.Empty;

            var posts =await this.postsService.GetPostsAsync(userId);

            return this.Ok(posts);
        }

        [HttpGet("{postId}")]
        public async Task<IActionResult> GetPostByIdAsync(string postId)
        {
            var post = await this.postsService.GetByIdAsync(postId);

            return this.Ok(post);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync([FromBody] CreatePostViewModel viewModel)
        {
            var userId = string.Empty;

            if (userId != null)
            {
                // var postId = this.postsService.CreateAsync(viewModel, userId);
            }
            return this.NoContent();
        }

        [HttpPut]
        public async Task<IActionResult> EditPostAsync(EditPostViewModel viewModel)
        {
            return this.NoContent();
        }
    }
}
