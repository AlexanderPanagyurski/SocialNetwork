namespace SocialNetwork.Services.Contracts
{
    using System.Threading.Tasks;
    using SocialNetwork.Web.ViewModels.Auth;

    public interface IAuthService
    {
        Task RegisterAsync(RegisterViewModel userViewModel);

        Task<LoginViewModel> ValidateUserAsync(SignInViewModel userViewModel);
    }
}
