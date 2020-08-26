using Domain.Aggregates.Hospitals;
using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    public class TelemedicineContext : DbContext
    {
        public TelemedicineContext(DbContextOptions options) : base(options)
        {
           
        }

        public DbSet<Hospital> Hospital { get; set; }
    }
}