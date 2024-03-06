namespace SocialNetwork.Data.Configurations
{
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    internal class VoteConfiguration : IEntityTypeConfiguration<Vote>
    {
        public void Configure(EntityTypeBuilder<Vote> vote)
        {
            vote.HasKey(x => x.Id);

            vote.HasOne(x => x.User)
                .WithMany(u => u.Votes)
                .HasForeignKey(u => u.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            vote.HasOne(x => x.Post)
                .WithMany(p => p.Votes)
                .HasForeignKey(u => u.PostId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

        }
    }
}
