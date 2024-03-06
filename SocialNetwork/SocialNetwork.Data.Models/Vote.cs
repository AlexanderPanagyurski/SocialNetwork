namespace SocialNetwork.Data.Models
{
    using SocialNetwork.Data.Common;
    using SocialNetwork.Data.Models.Enums;

    public class Vote : BaseModel<int>
    {
        public string PostId { get; set; }

        public virtual Post Post { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public VoteType VoteType { get; set; }
    }
}