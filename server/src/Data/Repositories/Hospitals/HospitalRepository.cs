using System;
using System.Collections.Generic;
using System.Text;
using Domain.Aggregates.Hospitals;
using Microsoft.EntityFrameworkCore;

namespace Data.Repositories.Hospitals
{
    public class HospitalRepository : EfRepository<Hospital>, IHospitalRepository
    {

        public HospitalRepository(DbContext context) : base(context)
        {

        }

    }
}
