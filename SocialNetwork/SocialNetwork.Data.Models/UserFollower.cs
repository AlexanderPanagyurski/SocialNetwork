using SocialNetwork.Data.Common;
using SocialNetwork.Data.Common.Contracts;

namespace SocialNetwork.Data.Models
{
    public class UserFollower : BaseDeletableModel<string>
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public string FollowerId { get; set; }

        public virtual User Follower { get; set; }
    }
}
