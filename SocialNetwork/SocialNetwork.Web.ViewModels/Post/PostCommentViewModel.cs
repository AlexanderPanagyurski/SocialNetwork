namespace SocialNetwork.Web.ViewModels.Post
{
    using System;
    using System.Collections.Generic;
    using System.Net;
    using System.Text;
    using System.Text.RegularExpressions;

    public class PostCommentViewModel
    {
        public string Id { get; set; }

        public string ParentId { get; set; }

        public string ShortContent
        {
            get
            {
                var content = WebUtility.HtmlDecode(Regex.Replace(this.Content, @"<[^>]+>", string.Empty));
                return content.Length > 300
                        ? content.Substring(0, 300) + "..."
                        : content;
            }
        }

        //public string SanitizedShortContent => new HtmlSanitizer().Sanitize(this.ShortContent);

        //public string SanitizedContent => new HtmlSanitizer().Sanitize(this.Content);

        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public string UserUserName { get; set; }

        public string UserId { get; set; }

        public byte[] UserProfileImage { get; set; }

        public IEnumerable<PostCommentViewModel> Children { get; set; }
    }
}
