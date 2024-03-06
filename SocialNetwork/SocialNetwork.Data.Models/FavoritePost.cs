namespace SocialNetwork.Data.Models
{
    using System;
    using SocialNetwork.Data.Common;

    public class FavoritePost : BaseDeletableModel<string>
    {
        public FavoritePost()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string PostId { get; set; }

        public virtual Post Post { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }
    }
}