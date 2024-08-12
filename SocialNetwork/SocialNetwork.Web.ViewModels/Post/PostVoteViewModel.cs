using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SocialNetwork.Web.ViewModels.Post
{
    public class PostVoteViewModel
    {
        public string PostId { get; set; }

        public bool IsUpVote { get; set; }
    }
}
