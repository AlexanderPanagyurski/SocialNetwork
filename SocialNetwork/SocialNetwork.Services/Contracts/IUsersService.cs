using SocialNetwork.Web.ViewModels.Post;
using SocialNetwork.Web.ViewModels.User;
namespace SocialNetwork.Services.Contracts
{
    public interface IUsersService
    {
        Task<IEnumerable<UserViewModel>> GetUsersAsync(string? username);
        Task<UserViewModel> GetUserAsync(string userId);
        Task<string> EditUserAsync(AuthUserViewModel user);
        Task<IEnumerable<UserViewModel>> GetUsersByUsernameAsync(string? username);
        Task<IEnumerable<UserViewModel>> GetUserFollwers(string userId);
        Task<IEnumerable<UserViewModel>> GetUserFollwings(string userId);
        Task<IEnumerable<PostViewModel>> GetFavouritePostsAsync(string userId);
        Task<IEnumerable<PostViewModel>> GetUserPostsAsync(string userId);
        Task ManageSubscriptionAsync(string userId, string followingId);
    }
}
