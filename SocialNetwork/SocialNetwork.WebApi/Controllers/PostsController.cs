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

        [HttpGet("{postId}")]
        public async Task<IActionResult> Index(string postId)
        {
            var viewModel = await this.postsService.GetByIdAsync(postId);

            return this.Ok(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePostAsync(CreatePostViewModel viewModel)
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
