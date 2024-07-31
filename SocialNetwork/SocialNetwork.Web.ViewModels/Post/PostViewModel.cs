using System;
using System.Collections.Generic;
using System.Text;

namespace SocialNetwork.Web.ViewModels.Post
{
    public class PostViewModel
    {
        public string PostId { get; set; }

        public string UserProfileImage { get; set; }

        public string UserId { get; set; }

        public DateTime CreatedOn { get; set; }

        public DateTime? ModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        //public string SanitizedContent => new HtmlSanitizer().Sanitize(this.Content);

        public string UserUserName { get; set; }

        public int VotesCount { get; set; }

        public int FavoritesCount { get; set; }

        public bool IsOwner { get; set; }

        public IEnumerable<PostCommentViewModel> Comments { get; set; }

        public IEnumerable<ImagesViewModel> Images { get; set; }

    }
}
