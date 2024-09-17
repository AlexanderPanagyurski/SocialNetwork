using SocialNetwork.Data.Common;
using System.ComponentModel.DataAnnotations;

namespace SocialNetwork.Data.Models
{
    public class Tag : BaseDeletableModel<string>
    {
        public Tag()
        {
            this.Id = Guid.NewGuid().ToString();
        }


        [Required]
        [MaxLength(15,ErrorMessage ="Tags length should be less than 15 characters.")]
        public string Name { get; set; }

        public virtual ICollection<PostTag> PostTags { get; set; } = new HashSet<PostTag>();
    }
}
