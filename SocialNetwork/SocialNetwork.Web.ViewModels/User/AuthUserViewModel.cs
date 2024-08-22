using Microsoft.AspNetCore.Http;

namespace SocialNetwork.Web.ViewModels.User
{
    public class AuthUserViewModel
    {
        public string Token { get; set; }

        public string Id { get; set; }

        public string Email { get; set; }

        public string UserName { get; set; }

        public byte[]? ProfileImageUrl { get; set; }

        public IFormFile Image { get; set; }
    }
}
