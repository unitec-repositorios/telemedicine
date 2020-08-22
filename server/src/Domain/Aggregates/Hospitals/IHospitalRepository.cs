using Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Aggregates.Hospitals
{
    public interface IHospitalRepository : IBaseRepository<Hospital>
    {
    }
}
