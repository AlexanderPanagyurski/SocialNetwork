namespace SocialNetwork.Services.Contracts
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public interface ICommentsService
    {
        Task CreateAsync(string postId, string userId, string content, string parentId = null);

        Task<bool> IsInPostIdAsync(string commentId, string postId);
    }
}
