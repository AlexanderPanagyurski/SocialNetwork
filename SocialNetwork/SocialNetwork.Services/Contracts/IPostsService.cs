﻿namespace SocialNetwork.Services.Contracts
{
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using SocialNetwork.Web.ViewModels.Post;

    public interface IPostsService
    {
        Task<PostViewModel> GetByIdAsync(string id);

        Task<IEnumerable<PostViewModel>> GetPostsAsync(string userId);

        Task<string> CreateAsync(CreatePostViewModel input, string userId);
    }
}
