using Domain.Aggregates.ReferencesACS_PS;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.ReferencesACS_PS
{
    public interface IReferenceACS_PSService
    {

        public Task<ReferenceACS_PS> FindById(int id);

        public Task Create(ReferenceACS_PS reference);

        public Task<IEnumerable<ReferenceACS_PS>> All(int? id);

        public Task Remove(int id);

    }
}
