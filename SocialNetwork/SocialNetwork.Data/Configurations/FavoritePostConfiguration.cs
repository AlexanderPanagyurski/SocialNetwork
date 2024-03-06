using SocialNetwork.Data.Models;
using System;

namespace SocialNetwork.Data.Configurations
{
    using System;
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class FavoritePostConfiguration : IEntityTypeConfiguration<FavoritePost>
    {
        public void Configure(EntityTypeBuilder<FavoritePost> favoritePost)
        {
            favoritePost.HasKey(fp => fp.Id);

            favoritePost
                .HasOne(fp => fp.Post)
                .WithMany(p => p.FavoritePosts)
                .HasForeignKey(fp => fp.PostId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            favoritePost
                .HasOne(fp => fp.User)
                .WithMany(p => p.FavoritePosts)
                .HasForeignKey(fp => fp.UserId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}