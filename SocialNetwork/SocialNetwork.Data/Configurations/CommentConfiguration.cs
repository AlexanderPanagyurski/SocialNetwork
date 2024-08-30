namespace SocialNetwork.Data.Configurations
{
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> comment)
        {
            comment.HasKey(x => x.Id);

            comment.Property(x => x.ParentId)
                .IsRequired(false);

            comment.Property(x => x.Content)
                .IsRequired();

            comment
                .HasOne(c => c.User)
                .WithMany(u => u.Comments)
                .HasForeignKey(c => c.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            comment
                .HasOne(c => c.Post)
                .WithMany(p => p.Comments)
                .HasForeignKey(x => x.PostId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            comment
                .HasOne(c => c.Parent)
                .WithMany(p => p.Children)
                .HasForeignKey(x => x.ParentId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}