namespace SocialNetwork.Data.Models
{
    using System;
    using SocialNetwork.Data.Common;

    public class UserImage : BaseDeletableModel<string>
    {
        public UserImage()
        {
            this.Id = Guid.NewGuid().ToString();
        }

        public string UserId { get; set; }

        public virtual User User { get; set; }

        public byte[] Content { get; set; }

        public bool IsProfileImage { get; set; }
    }
}