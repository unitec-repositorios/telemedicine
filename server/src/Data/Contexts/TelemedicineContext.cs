using Microsoft.EntityFrameworkCore;

namespace Data.Contexts
{
    public class TelemedicineContext : DbContext
    {
        public TelemedicineContext(DbContextOptions options) : base(options)
        {
        }
    }
}