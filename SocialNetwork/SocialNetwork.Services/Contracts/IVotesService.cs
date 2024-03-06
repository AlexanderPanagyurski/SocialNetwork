namespace SocialNetwork.Services.Contracts
{
    using System;
    using System.Collections.Generic;
    using System.Text;
    using System.Threading.Tasks;

    public interface IVotesService
    {
        Task VoteAsync(string postId, string userId, bool isUpVote);

        Task<int> GetVotesAsync(string postId);
    }
}
