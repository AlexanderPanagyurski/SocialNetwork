namespace SocialNetwork.Services.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using SocialNetwork.Web.ViewModels.Post;

    public interface IPostsService
    {
        Task<PostViewModel> GetByIdAsync(string id, string userId);

        Task<IEnumerable<PostViewModel>> GetPostsAsync(string userId);

        Task<IEnumerable<PostCommentViewModel>> GetCommentsAsync(string postId);

        Task<PostCommentViewModel> AddCommentAsync(string postId, string? parentId, string userId, string content);

        Task<bool> AddToFavouriteAsync(string postId, string userId);

        Task<int> GetFavouritesCountAsync(string postId);

        Task<string> CreateAsync(CreatePostViewModel input, string userId);

        Task<string> EditAsync(EditPostViewModel input, string userId);

        Task SoftDeleteAsync(string postId, string userId);
    }
}
