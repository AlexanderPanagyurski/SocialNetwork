﻿using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Web.ViewModels.Post
{
    public class CreatePostViewModel
    {
        [Required]
        [StringLength(50, ErrorMessage = "The {0} must be at least {2} and at max {1} characters long.", MinimumLength = 6)]
        public string Title { get; set; }

        [Required]
        public string Content { get; set; }
    }
}
