using Domain.Aggregates.Reference;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.References
{
    public class ReferenceService : IReferenceService
    {

        private readonly IReferenceRepository _referenceRepository;

        public ReferenceService(IReferenceRepository referenceRepository)
        {
            _referenceRepository = referenceRepository;
        }


        public async Task<Reference> FindById(int id)
        {
            return await _referenceRepository.FindById(id);
        }

        public async Task<IEnumerable<Reference>> All(int? id)
        {
            return await _referenceRepository
                .Filter(network => !network.Disabled)
                .Where(x => id == null || x.Id == id)
                .ToListAsync();
        }

        public async Task<IEnumerable<Reference>> All()
        {
            return await _referenceRepository
                .Filter(network => !network.Disabled)
                .ToListAsync();
        }

        public async Task Remove(int id)
        {
            var reference = await _referenceRepository.FindById(id);
            await _referenceRepository.Disable(reference);
        }

        public async Task Create(Reference reference)
        {
            await _referenceRepository.Add(reference);
        }
    }
}
