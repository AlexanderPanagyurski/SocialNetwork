namespace SocialNetwork.Web.ViewModels.Post
{
    using System.ComponentModel.DataAnnotations;

    public class EditPostViewModel
    {
        public string Id { get; set; }

        [Required]
        [StringLength(500, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 10)]
        public string Content { get; set; }
    }
}
