using Domain.Aggregates.Networks;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    public class TelemedicineContext : DbContext
    {
        public TelemedicineContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Network> Networks { get; set; }
    }
}