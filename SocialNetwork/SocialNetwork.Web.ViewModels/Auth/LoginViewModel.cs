namespace SocialNetwork.Web.ViewModels.Auth
{
    public class LoginViewModel
    {
        public string UserId { get; set; }

        public string Email { get; set; }

        public byte[]? ProfileImageUrl { get; set; }

        public string UserName { get; set; }
    }
}
