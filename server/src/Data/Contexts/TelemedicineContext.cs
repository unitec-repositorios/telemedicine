using Domain.Aggregates.Hospitals;
using Domain.Aggregates.Networks;
using Domain.Aggregates.Patients;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    public class TelemedicineContext : DbContext
    {
        public TelemedicineContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Network> Networks { get; set; }
        public DbSet<Patient> Patients { get; set; }
        public DbSet<Hospital> Hospitals { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Network>()
                .HasMany<Hospital>(h => h.Hospitals)
                .WithOne(x => x.Network);
        }
    }
}