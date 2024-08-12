using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using SocialNetwork.Services.Contracts;
using SocialNetwork.Web.ViewModels.Post;
using System.Security.Claims;

namespace SocialNetwork.WebApi.Controllers
{
    [Authorize]
    public class PostsController : BaseApiController
    {
        private readonly IVotesService votesService;
        private readonly IPostsService postsService;

        public PostsController(
            IVotesService votesService,
            IPostsService postsService)
        {
            this.votesService = votesService;
            this.postsService = postsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPostsAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                this.BadRequest();
            }

            var posts = await this.postsService.GetPostsAsync(userId);

            return this.Ok(posts);
        }

        [HttpGet("{postId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetPostByIdAsync(string postId)
        {
            try
            {
                var post = await this.postsService.GetByIdAsync(postId);

                return this.Ok(post);

            }
            catch (ArgumentException ex)
            {
                return this.NotFound(ex.Message);
            }
        }

        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> CreatePostAsync()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId))
            {
                return this.BadRequest();
            }

            string title = Request.Form["title"];
            string content = Request.Form["content"];
            IEnumerable<IFormFile> images = Request.Form.Files;

            var viewModel = new CreatePostViewModel()
            {
                Title = title,
                Content = content,
                Images = images
            };

            var postId = await this.postsService.CreateAsync(viewModel, userId);

            return this.Ok(new { postId });
        }

        [HttpPut]
        public async Task<IActionResult> EditPostAsync(EditPostViewModel viewModel)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null || !ModelState.IsValid)
            {
                return BadRequest("Something went wrong...");
            }

            try
            {
                var postId = await this.postsService.EditAsync(viewModel, userId);
                return this.Ok(new { postId });
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> DeletePostAsync(string postId)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (userId == null)
            {
                return BadRequest("Something went wrong...");
            }

            try
            {
                await this.postsService.SoftDeleteAsync(postId, userId);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("{postId}/vote")]
        public async Task<IActionResult> VotePostAsync(PostVoteViewModel viewModel)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            await this.votesService.VoteAsync(viewModel.PostId, userId, viewModel.IsUpVote);
            var votesCount = await this.votesService.GetVotesAsync(viewModel.PostId);

            return this.Ok(new { votesCount, viewModel.IsUpVote });
        }

        [HttpPost("{postId}/favourite")]
        public async Task<IActionResult> AddToFavourites(PostVoteViewModel viewModel)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var isFavourite = await this.postsService.AddToFavouriteAsync(viewModel.PostId, userId);
            var favoritesCount = await this.postsService.GetFavouritesCountAsync(viewModel.PostId);

            return this.Ok(new { isFavourite, favoritesCount });
        }
    }
}
