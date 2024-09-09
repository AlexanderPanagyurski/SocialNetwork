using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Web.ViewModels.Post
{
    public class CreatePostViewModel
    {
        [Required]
        [StringLength(500, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string Content { get; set; }

        public IEnumerable<IFormFile> Images { get; set; }
    }
}
