using SocialNetwork.Web.ViewModels.User;
namespace SocialNetwork.Services.Contracts
{
    public interface IUsersService
    {
        Task<IEnumerable<UserViewModel>> GetUsersAsync();
        Task<UserViewModel> GetUserAsync(string userId);

        Task<IEnumerable<UserViewModel>> GetUserFollwers(string userId);
        Task<IEnumerable<UserViewModel>> GetUserFollwings(string userId);

        Task ManageSubscriptionAsync(string userId, string followingId);
    }
}
