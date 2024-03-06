namespace SocialNetwork.Data.Configurations
{
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class ImageConfiguration : IEntityTypeConfiguration<Image>
    {
        public void Configure(EntityTypeBuilder<Image> image)
        {
            image.HasKey(x => x.Id);

            image
                .HasOne(x => x.User)
                .WithMany(u => u.Images)
                .HasForeignKey(i => i.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            image
                .HasOne(i => i.Post)
                .WithMany(p => p.Images)
                .HasForeignKey(i => i.PostId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}
