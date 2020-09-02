using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Data.Repositories.ReferencesACS_PS
{
    public class ReferenceACS_PSRepository : EfRepository<ReferenceACS_PS>, IReferenceACS_PSRepository
    {
        public ReferenceACS_PSRepository(DbContext context) : base(context)
        {

        }

    }
}
