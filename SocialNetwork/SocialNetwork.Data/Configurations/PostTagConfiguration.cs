using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;
using SocialNetwork.Data.Models;

namespace SocialNetwork.Data.Configurations
{
    public class PostTagConfiguration : IEntityTypeConfiguration<PostTag>
    {
        public void Configure(EntityTypeBuilder<PostTag> postTag)
        {
            postTag.HasKey(x => new { x.PostId, x.TagId });

            postTag
               .HasOne(x => x.Post)
               .WithMany(y => y.PostTags)
               .HasForeignKey(x => x.PostId)
               .OnDelete(DeleteBehavior.Restrict);

            postTag
                .HasOne(x => x.Tag)
                .WithMany(y => y.PostTags)
                .HasForeignKey(x => x.TagId)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
