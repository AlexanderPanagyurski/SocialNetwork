using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Services.Contracts;
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
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await usersService.GetUsersAsync();

            return this.Ok(users);
        }

        [HttpGet("{userId}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetUserAsync(string userId)
        {
            try
            {
                var user = await usersService.GetUserAsync(userId);

                return Ok(user);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpPost("subscription")]

        public async Task<IActionResult> ManageSubscriptionAsync(string followedUserId)
        {
            try
            {
                var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

                await usersService.ManageSubscriptionAsync(userId, followedUserId);
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
        // TODO: Implement tags filtation "posts/tags/{tagName}"
    }
}
