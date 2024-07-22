using SocialNetwork.Web.ViewModels.User;
namespace SocialNetwork.Services.Contracts
{
    public interface IUsersService
    {
        Task<IEnumerable<UserViewModel>> GetUsersAsync();

        Task ManageSubscriptionAsync(string userId, string followingId);
    }
}
