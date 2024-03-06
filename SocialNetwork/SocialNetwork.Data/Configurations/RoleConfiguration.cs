namespace SocialNetwork.Data.Configurations
{
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> role)
        {
            role.HasKey(x => x.Id);

            role.Property(x => x.Name)
                .IsRequired();
        }
    }
}