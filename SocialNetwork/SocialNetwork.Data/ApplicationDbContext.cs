namespace SocialNetwork.Data
{
    using SocialNetwork.Data.Models;
    using Microsoft.EntityFrameworkCore;

    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext()
        {
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                /* To do:
                optionsBuilder.UseSqlServer(this.configuration.GetConnectionString("DefaultConnection"));
                throws Value cannot be null. (Parameter 'connectionString')
                 */

                optionsBuilder.UseSqlServer("Server=DESKTOP-D12RT2K\\SQLEXPRESS;Database=SocialNetwork;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        public DbSet<User> Users { get; set; }

        public DbSet<Role> Roles { get; set; }

        public DbSet<UserRole> UserRoles { get; set; }

        public DbSet<Comment> Comments { get; set; }

        public DbSet<FavoritePost> FavoritePosts { get; set; }

        public DbSet<Image> Images { get; set; }

        public DbSet<Post> Posts { get; set; }

        public DbSet<UserImage> UserImages { get; set; }

        public DbSet<Vote> Votes { get; set; }

        public DbSet<UserFollower> UserFollowers { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.ApplyConfigurationsFromAssembly(this.GetType().Assembly);
        }
    }
}
