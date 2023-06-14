using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;


namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {


        public DataContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<University> Universities { get; set; }
        public DbSet<Faculty> Faculties { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // ...

            builder.Entity<Faculty>()
            .HasOne(u => u.University)
            .WithMany(u => u.Faculties)
            .HasForeignKey(f => f.UniversityId);
        }
    }
}