using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.ReferencesACS_PS
{
    public class ReferenceCommunityAgentHealthPromoterService : IReferenceCommunityAgentHealthPromoterService
    {

        private readonly IReferenceCommunityAgentHealthPromoterRepository _referenceACS_PSRepository;

        public ReferenceCommunityAgentHealthPromoterService(IReferenceCommunityAgentHealthPromoterRepository referenceACS_PSRepository)
        {
            _referenceACS_PSRepository = referenceACS_PSRepository;
        }


        public async Task<ReferenceCommunityAgentHealthPromoter> FindById(int id)
        {
            return await _referenceACS_PSRepository.FindById(id);
        }

        public async Task<IEnumerable<ReferenceCommunityAgentHealthPromoter>> All(int? id)
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

        public async Task Create(ReferenceCommunityAgentHealthPromoter reference)
        {
            await _referenceACS_PSRepository.Add(reference);
        }

        public async Task<IEnumerable<ReferenceCommunityAgentHealthPromoter>> All()
        {
            return await _referenceACS_PSRepository
                .Filter(network => !network.Disabled)
                .ToListAsync();
        }
    }
}
