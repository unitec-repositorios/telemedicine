using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Modules.ReferencesCommunityAgentHealthPromoter;
using Core.ReferencesACS_PS;
using Domain.Aggregates.Patients;
using Domain.Aggregates.Reference;
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
        private readonly IPatientRepository patientRepository;

        public ReferencesCommunityAgentHealthPromoterController(
            IReferenceCommunityAgentHealthPromoterService referenceACS_PSService,
            IPatientRepository patientRepository)
        {
            _referenceACS_PSService = referenceACS_PSService;
            this.patientRepository = patientRepository;
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
                    ReferrerPhone = reference.ReferrerPhone,
                    ReferrerEmail = reference.ReferrerEmail,
                    ActionTaken = reference.ActionTaken,
                    OriginHfId = reference.OriginHfId,
                    DestinationHfId = reference.DestinationHfId,

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
                PatientId = referenceACS_PSViewModel.PatientId,
                Motive = referenceACS_PSViewModel.Motive,
                Referrer = referenceACS_PSViewModel.Referrer,
                ReferrerPhone = referenceACS_PSViewModel.ReferrerPhone,
                ReferrerEmail = referenceACS_PSViewModel.ReferrerEmail,
                ActionTaken = referenceACS_PSViewModel.ActionTaken,
                OriginHfId = referenceACS_PSViewModel.OriginHfId,
                DestinationHfId = referenceACS_PSViewModel.DestinationHfId,

            };

            await _referenceACS_PSService.Create(reference);
        }


        [HttpGet]
        public async Task<IEnumerable<ReferenceCommunityAgentHealthPromoterViewModel>> GetAllAsync()
        {
            var patients = this.patientRepository.All();
            var references = await this._referenceACS_PSService.All();

            var result = references.Join(patients, r => r.PatientId, p => p.Id.ToString(), (r, p) => new { r, p });

            var referencesResult = result.Select(r => new ReferenceCommunityAgentAndHealthPromoterViewModel
            {
                Id = r.r.Id,
                Patient = r.p.FullName(),
                Origin = r.r.OriginHfId,
                Destination = r.r.DestinationHfId,
            });

            return (IEnumerable<ReferenceCommunityAgentHealthPromoterViewModel>)referencesResult;
        }

    }
}
