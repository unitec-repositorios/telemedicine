using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Core.References;
using Domain.Aggregates.Patients;
using Domain.Aggregates.Reference;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.References
{
    [ApiController]
    [Route("[controller]")]
    public class ReferencesController : Controller
    {
        private readonly IReferenceService _referenceService;
        private readonly IPatientRepository patientRepository;

        public ReferencesController(
            IReferenceService referenceService,
            IPatientRepository patientRepository)
        {
            _referenceService = referenceService;
            this.patientRepository = patientRepository;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id)
        {
            var data = (await _referenceService.All(id))
                .Select(referenceViewModel => new ReferenceViewModel
                {
                    Id = referenceViewModel.Id,
                    Type = referenceViewModel.Type,
                    OriginHfId = referenceViewModel.OriginHfId,
                    DestinationHfId = referenceViewModel.DestinationHfId,
                    PatientId = referenceViewModel.PatientId,
                    Motive = referenceViewModel.Motive,
                    DescriptionMotive = referenceViewModel.DescriptionMotive,
                    Symptoms = referenceViewModel.Symptoms,
                    MedicalSummary = referenceViewModel.MedicalSummary,
                    VitalSigns = referenceViewModel.VitalSigns,
                    ObGyn = referenceViewModel.ObGyn,
                    PhysicalExamination = referenceViewModel.PhysicalExamination,
                    ComplementaryExams = referenceViewModel.ComplementaryExams,
                    DiagnosticImpression = referenceViewModel.DiagnosticImpression,
                    Observations = referenceViewModel.Observations,
                    Risk = referenceViewModel.Risk,
                    AttentionRequired = referenceViewModel.AttentionRequired,
                    MadeBy = referenceViewModel.MadeBy,
                    ContactedHf = referenceViewModel.ContactedHf,
                    ContactId = referenceViewModel.ContactId,
                    Date = referenceViewModel.Date,
                });

            return Ok(data);
        }


        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _referenceService.Remove(id);
        }

        [HttpPost]
        public async Task Post(ReferenceViewModel referenceViewModel)
        {
            string vitalSignsJSON;
            vitalSignsJSON = JsonSerializer.Serialize(referenceViewModel.VitalSigns);

            string obGynJSON;
            obGynJSON = JsonSerializer.Serialize(referenceViewModel.ObGyn);

            string physicalExaminationJSON;
            physicalExaminationJSON = JsonSerializer.Serialize(referenceViewModel.PhysicalExamination);

            var reference = new Reference
            {
                Id = referenceViewModel.Id,
                Type = referenceViewModel.Type,
                OriginHfId = referenceViewModel.OriginHfId,
                DestinationHfId = referenceViewModel.DestinationHfId,
                PatientId = referenceViewModel.PatientId,
                Motive = referenceViewModel.Motive,
                DescriptionMotive = referenceViewModel.DescriptionMotive,
                Symptoms = referenceViewModel.Symptoms,
                MedicalSummary = referenceViewModel.MedicalSummary,
                VitalSigns = vitalSignsJSON,
                ObGyn = obGynJSON,
                PhysicalExamination = physicalExaminationJSON,
                ComplementaryExams = referenceViewModel.ComplementaryExams,
                DiagnosticImpression = referenceViewModel.DiagnosticImpression,
                Observations = referenceViewModel.Observations,
                Risk = referenceViewModel.Risk,
                AttentionRequired = referenceViewModel.AttentionRequired,
                MadeBy = referenceViewModel.MadeBy,
                ContactedHf = referenceViewModel.ContactedHf,
                ContactId = referenceViewModel.ContactId,
                Date = referenceViewModel.Date,

            };

            await _referenceService.Create(reference);
        }

        [HttpGet]
        public async Task<IEnumerable<ReferenceRespondViewModel>> GetAllAsync()
        {
            var patients = this.patientRepository.All();
            var references = await this._referenceService.All();

            var result = references.Join(patients, r => r.PatientId, p => p.Id.ToString(), (r, p) => new { r, p });


            var referencesResult = result.Select(r => new ReferenceRespondViewModel
            {
                Id = r.r.Id,
                Patient = r.p.FullName(),
                Origin = r.r.OriginHfId,
                Destination = r.r.DestinationHfId,
            });

            return (IEnumerable<ReferenceRespondViewModel>)referencesResult;
        }

    }
}
