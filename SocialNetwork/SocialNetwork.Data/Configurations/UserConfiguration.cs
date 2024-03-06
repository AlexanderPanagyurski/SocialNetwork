namespace SocialNetwork.Data.Configurations
{
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> appUser)
        {
            appUser.HasKey(x => x.Id);

            appUser
                .Property(x => x.UserName)
                .IsUnicode()
                .IsRequired();

            appUser
                .Property(x => x.Email)
                .IsRequired();

            appUser
                .Property(x => x.PasswordHash)
                .IsRequired();
        }
    }
}
