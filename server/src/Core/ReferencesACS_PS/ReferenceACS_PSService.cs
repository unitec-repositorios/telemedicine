using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ReferencesACS_PS
{
    public class ReferenceACS_PSService : IReferenceACS_PSService
    {

        private readonly IReferenceACS_PSRepository _referenceACS_PSRepository;

        public ReferenceACS_PSService(IReferenceACS_PSRepository referenceACS_PSRepository)
        {
            _referenceACS_PSRepository = referenceACS_PSRepository;
        }


        public async Task<ReferenceACS_PS> FindById(int id)
        {
            return await _referenceACS_PSRepository.FindById(id);
        }

        public async Task<IEnumerable<ReferenceACS_PS>> All(int? id)
        {
            return await _referenceACS_PSRepository
                .Filter(network => !network.Disabled)
                .Where(x => id == null || x.Id == id)
                .ToListAsync();
        }

        public async Task Remove(int id)
        {
            var reference = await _referenceACS_PSRepository.FindById(id);
            await _referenceACS_PSRepository.Disable(reference);
        }

        public async Task Create(ReferenceACS_PS reference)
        {
            await _referenceACS_PSRepository.Add(reference);
        }

    }
}
