using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Services.Contracts;
using SocialNetwork.Web.ViewModels.Post;
using SocialNetwork.Web.ViewModels.User;
using System.Security.Claims;

namespace SocialNetwork.WebApi.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUsersService usersService;

        public UsersController(IUsersService usersService)
        {
            this.usersService = usersService;
        }


        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsersAsync(string? username)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                var users = await usersService.GetUsersAsync(userId, username);
                return this.Ok(users);
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }

        }

        [HttpGet("[action]")]
        public async Task<IActionResult> Profile()
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                var user = await this.usersService.GetUserAsync(userId, userId);

                var response = new AuthUserViewModel
                {
                    Id = user.UserId,
                    Email = user.UserEmail,
                    ProfileImageUrl = user.ProfileImageUrl,
                    UserName = user.UserUserName
                };
                return this.Ok(response);
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserAsync([FromHeader] string authUserId, [FromRoute] string userId)
        {
            try
            {
                var user = await usersService.GetUserAsync(authUserId, userId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("subscription")]
        public async Task<IActionResult> ManageSubscriptionAsync([FromBody] SubscriptionRequest subscriptionRequest)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                await usersService.ManageSubscriptionAsync(userId, subscriptionRequest.FollowedUserId);
            }
            catch (ArgumentException ex)
            {
                return this.BadRequest(ex.Message);
            }
            return NoContent();
        }


        [HttpGet("{userId}/followers")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserFollowers(string userId)
        {
            try
            {
                var userFollowers = await this.usersService.GetUserFollwers(userId);

                return this.Ok(userFollowers);
            }
            catch (ArgumentException ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [HttpGet("{userId}/followings")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserFollowings(string userId)
        {
            try
            {
                var userFollowings = await this.usersService.GetUserFollwings(userId);

                return this.Ok(userFollowings);
            }
            catch (ArgumentException ex)
            {
                return this.BadRequest(ex.Message);
            }
        }

        [HttpPut("{userId}/edit")]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> EditUserAsync(string userId)
        {
            var isAuth = User.FindFirstValue(ClaimTypes.NameIdentifier);

            string username = Request.Form["username"];
            IFormFile image = null;

            if (Request.Form.Files.Any())
            {
                image = Request.Form.Files[0];
            }

            if (string.IsNullOrEmpty(isAuth) || isAuth != userId)
            {
                return this.BadRequest();
            }

            var viewModel = new AuthUserViewModel
            {
                Id = userId,
                UserName = username,
                Image = image
            };

            var response = await this.usersService.EditUserAsync(viewModel);

            return this.Ok(new { userId });
        }

        [HttpGet("/api/search")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUsersByUsernameAsync(string? username)
        {
            var users = await this.usersService.GetUsersByUsernameAsync(username);
            return this.Ok(users);
        }

        [HttpGet("{userId}/favourite-posts")]
        public async Task<IActionResult> GetFavouritePostsAsync([FromRoute] string userId, [FromQuery] int skip = 0, [FromQuery] int take = 5)
        {
            var posts = await this.usersService.GetFavouritePostsAsync(userId, skip, take);

            return this.Ok(posts);
        }

        [HttpGet("{userId}/posts")]
        public async Task<IActionResult> GetUserPostsAsync([FromRoute] string userId, [FromQuery] int skip = 0, [FromQuery] int take = 5)
        {
            var posts = await this.usersService.GetUserPostsAsync(userId, skip, take);

            return this.Ok(posts);
        }
    }
    public class SubscriptionRequest
    {
        public string FollowedUserId { get; set; }
    }
}
