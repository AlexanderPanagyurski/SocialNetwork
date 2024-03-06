namespace SocialNetwork.Data.Models
{
    using System;
    using System.Collections.Generic;
    using SocialNetwork.Data.Common;

    public class User : BaseDeletableModel<string>
    {
        public User()
        {
            this.Id = Guid.NewGuid().ToString();
            this.Roles = new HashSet<UserRole>();
        }

        public string Email { get; set; }

        public string PasswordHash { get; set; }

        public string UserName { get; set; }

        public DateTime DateOfBirth { get; set; }

        public string Address { get; set; }

        public string WebsiteUrl { get; set; }

        public string GithubUrl { get; set; }

        public string TwitterUrl { get; set; }

        public string InstagramUrl { get; set; }

        public string FacebookUrl { get; set; }

        public virtual ICollection<UserRole> Roles { get; set; }

        public virtual ICollection<Post> Posts { get; set; } = new HashSet<Post>();

        public virtual ICollection<Comment> Comments { get; set; } = new HashSet<Comment>();

        public virtual ICollection<FavoritePost> FavoritePosts { get; set; } = new HashSet<FavoritePost>();

        public virtual ICollection<Image> Images { get; set; } = new HashSet<Image>();

        public virtual ICollection<UserImage> UserImages { get; set; } = new HashSet<UserImage>();

        public virtual ICollection<Vote> Votes { get; set; } = new HashSet<Vote>();
    }
}