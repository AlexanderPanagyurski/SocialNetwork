using SocialNetwork.Data.Common;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Data.Models
{
    public class PostTag : BaseDeletableModel<string>
    {
        [Required]
        [ForeignKey(nameof(Post))]
        public string PostId { get; set; }

        public Post Post { get; set; }

        [Required]
        [ForeignKey(nameof(Tag))]
        public string TagId { get; set; }

        public Tag Tag { get; set; }
    }
}
