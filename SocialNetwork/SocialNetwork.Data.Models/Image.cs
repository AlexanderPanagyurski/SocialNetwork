namespace SocialNetwork.Data.Models
{
    using System;
    using SocialNetwork.Data.Common;

    public class Image : BaseDeletableModel<string>
    {
        public Image()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string PostId { get; set; }

        public virtual Post Post { get; set; }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public byte[] Content { get; set; }
    }
}