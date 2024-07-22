﻿namespace SocialNetwork.Web.ViewModels.User
{
    public class UserViewModel
    {
        public string UserId { get; set; }

        public string UserUserName { get; set; }

        public string UserEmail { get; set; }

        public int UserFollowingsCount { get; set; }

        public int UserFollowersCount { get; set; }

        public int UserPostsCount { get; set; }
    }
}
