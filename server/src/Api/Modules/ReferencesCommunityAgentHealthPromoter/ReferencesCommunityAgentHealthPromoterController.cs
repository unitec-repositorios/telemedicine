using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.ReferencesACS_PS;
using Domain.Aggregates.ReferencesACS_PS;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.ReferencesACS_PS
{
    [Route("[controller]")]
    [ApiController]
    public class ReferencesCommunityAgentHealthPromoterController : Controller
    {

        private readonly IReferenceCommunityAgentHealthPromoterService _referenceACS_PSService;

        public ReferencesCommunityAgentHealthPromoterController(IReferenceCommunityAgentHealthPromoterService referenceACS_PSService)
        {
            _referenceACS_PSService = referenceACS_PSService;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id)
        {
            var data = (await _referenceACS_PSService.All(id))
                .Select(reference => new ReferenceCommunityAgentHealthPromoterViewModel
                {
                    Id = reference.Id,
                    Date = reference.Date,
                    Community = reference.Community,
                    Motive = reference.Motive,
                    Referrer = reference.Referrer,
                    Referrer_Phone = reference.Referrer_Phone,
                    Referrer_Email = reference.Referrer_Email,
                    Action_Taken = reference.Action_Taken,
                    Origin_HF_ID = reference.Origin_HF_ID,
                    Destination_HF_ID = reference.Destination_HF_ID,

                });

            return Ok(data);
        }


        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _referenceACS_PSService.Remove(id);
        }

        [HttpPost]
        public async Task Post(ReferenceCommunityAgentHealthPromoterViewModel referenceACS_PSViewModel)
        {
            var reference = new ReferenceCommunityAgentHealthPromoter
            {
                Id = referenceACS_PSViewModel.Id,
                Date = referenceACS_PSViewModel.Date,
                Community = referenceACS_PSViewModel.Community,
                Patient_ID = referenceACS_PSViewModel.Patient_ID,
                Motive = referenceACS_PSViewModel.Motive,
                Referrer = referenceACS_PSViewModel.Referrer,
                Referrer_Phone = referenceACS_PSViewModel.Referrer_Phone,
                Referrer_Email = referenceACS_PSViewModel.Referrer_Email,
                Action_Taken = referenceACS_PSViewModel.Action_Taken,
                Origin_HF_ID = referenceACS_PSViewModel.Origin_HF_ID,
                Destination_HF_ID = referenceACS_PSViewModel.Destination_HF_ID,

            };

            await _referenceACS_PSService.Create(reference);
        }


    }
}
