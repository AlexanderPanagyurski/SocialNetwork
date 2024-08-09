using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using SocialNetwork.Data.Models;
using SocialNetwork.Services;
using SocialNetwork.Services.Contracts;
using SocialNetwork.Web.ViewModels.Auth;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SocialNetwork.WebApi.Controllers
{
    [AllowAnonymous]
    public class AuthController : BaseApiController
    {
        private readonly IUsersService usersService;
        private readonly IConfiguration configuration;
        private readonly IAuthService authService;

        public AuthController(
            IUsersService usersService,
            IConfiguration configuration,
            IAuthService authService)
        {
            this.usersService = usersService;
            this.configuration = configuration;
            this.authService = authService;
        }

        [HttpPost("[action]")]
        public async Task<IActionResult> Register(RegisterViewModel user)
        {
            try
            {
                await this.authService.RegisterAsync(user);
                return NoContent();
            }
            catch (ArgumentException ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost("[action]")]
        public async Task<IActionResult> Login([FromBody] SignInViewModel model)
        {
            var loginModel = await this.authService.ValidateUserAsync(model);

            if (loginModel == null)
            {
                return BadRequest(new { error = "Wrong email or password." });
            }

            var token = CreateToken(loginModel);

            return this.Ok(new UserViewModel { Id = loginModel.UserId, Email = loginModel.Email, UserName = loginModel.UserName, Token = token });
        }

        private string CreateToken(LoginViewModel user)
        {
            ICollection<Claim> claims = new HashSet<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier,user.UserId),
                new Claim(ClaimTypes.Email,user.Email),
                new Claim(ClaimTypes.Name,user.UserName)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                configuration.GetSection("JwtSettings:Token").Value!));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }

    public class UserViewModel
    {
        public string Token { get; set; }

        public string Id { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }
    }
}
