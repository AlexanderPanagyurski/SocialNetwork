using Microsoft.EntityFrameworkCore;
using SocialNetwork.Data;
using SocialNetwork.Data.Models;
using SocialNetwork.Data.Models.Enums;
using SocialNetwork.Services.Contracts;

namespace SocialNetwork.Services
{
    public class VotesService : IVotesService
    {
        private readonly ApplicationDbContext dbContenxt;

        public VotesService(ApplicationDbContext dbContenxt)
        {
            this.dbContenxt = dbContenxt;
        }

        public async Task<int> GetVotesAsync(string postId)
        {
            return await this.dbContenxt.Votes.Where(v => v.PostId == postId).SumAsync(v => (int)v.VoteType);
        }

        public async Task VoteAsync(string postId, string userId, bool isUpVote)
        {
            var vote = await this.dbContenxt
                .Votes
                .FirstOrDefaultAsync(v => v.PostId == postId && v.UserId == userId);

            if (vote != null)
            {
                vote.VoteType = isUpVote ? VoteType.UpVote : VoteType.DownVote;
                vote.ModifiedOn = DateTime.UtcNow;
            }
            else
            {
                vote = new Vote
                {
                    PostId = postId,
                    UserId = userId,
                    VoteType = isUpVote ? VoteType.UpVote : VoteType.DownVote,
                };

                this.dbContenxt.Votes.Add(vote);
            }

            await this.dbContenxt.SaveChangesAsync();
        }
    }
}
