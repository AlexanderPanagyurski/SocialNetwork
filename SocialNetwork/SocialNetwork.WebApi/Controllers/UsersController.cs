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
        public async Task<IActionResult> GetUsersAsync()
        {
            var users = await usersService.GetUsersAsync();

            return this.Ok(users);
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
    }
}
