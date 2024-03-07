namespace SocialNetwork.Services
{
    using System.Security.Cryptography;
    using System.Text;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.Configuration;
    using SocialNetwork.Data;
    using SocialNetwork.Data.Models;
    using SocialNetwork.Services.Contracts;
    using SocialNetwork.Web.ViewModels.Auth;

    public class AuthService : IAuthService
    {
        private readonly ApplicationDbContext dbContext;

        public AuthService(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task RegisterAsync(
            RegisterViewModel userViewModel)
        {
            var user = new User()
            {
                Email = userViewModel.Email,
                UserName = userViewModel.UserName,
                PasswordHash = this.ComputeHash(userViewModel.Password),
            };

            this.dbContext.Users.Add(user);
            user.Followings.Add(new UserFollower { UserId = user.Id, FollowerId = user.Id });
            await this.dbContext.SaveChangesAsync();
        }

        public async Task<LoginViewModel> ValidateUserAsync(SignInViewModel userViewModel)
        {
            var user = await this.dbContext
                .Users
                .FirstOrDefaultAsync(u => u.Email == userViewModel.Email
                && u.PasswordHash == this.ComputeHash(userViewModel.Password));

            return user != null ? new LoginViewModel
            {
                UserId = user.Id,
                UserName = user.UserName,
                Email=user.Email
            }
            : null;
        }

        //public async Task<LoginViewModel> ValidateUserAsync(SignInViewModel userViewModel)
        //{
        //    var user = await this.dbContext
        //        .Users
        //        .FirstOrDefaultAsync(u => u.Email == userViewModel.Email
        //        && u.PasswordHash == this.ComputeHash(userViewModel.Password));

        //    return user != null ? new LoginViewModel
        //    {
        //        UserId = user.Id,
        //        UserName = user.UserName,
        //    }
        //    : null;
        //}

        private string ComputeHash(string input)
        {
            var bytes = Encoding.UTF8.GetBytes(input);
            using (var hash = SHA512.Create())
            {
                var hashedInputBytes = hash.ComputeHash(bytes);

                // Convert to text
                // StringBuilder Capacity is 128, because 512 bits / 8 bits in byte * 2 symbols for byte 
                var hashedInputStringBuilder = new StringBuilder(128);
                foreach (var b in hashedInputBytes)
                    hashedInputStringBuilder.Append(b.ToString("X2"));
                return hashedInputStringBuilder.ToString();
            }
        }
    }
}
