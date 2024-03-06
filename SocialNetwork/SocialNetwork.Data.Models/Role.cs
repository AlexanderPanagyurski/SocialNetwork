namespace SocialNetwork.Data.Models
{
    using SocialNetwork.Data.Common;
    using System.Collections.Generic;

    public class Role : BaseDeletableModel<string>
    {
        public Role()
        {
            this.Id = Guid.NewGuid().ToString();    
        }

        public string Name { get; set; }

        public string Description { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}
