﻿using Domain.Aggregates.Hospitals;
using Domain.Aggregates.Networks;
﻿using Domain.Aggregates.Networks;
using Domain.Aggregates.Patients;
using Domain.Aggregates.Reference;
using Domain.Aggregates.ReferencesACS_PS;
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
        public DbSet<Reference> References { get; set; }
<<<<<<< Updated upstream
        public DbSet<ReferenceACS_PS> ReferencesACS_PS { get; set; }
=======
        public DbSet<ReferenceCommunityAgentHealthPromoter> ReferencesCommunityAgentHealthPromoter { get; set; }
>>>>>>> Stashed changes
    }
}