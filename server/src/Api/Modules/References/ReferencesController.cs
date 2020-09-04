using System;
using System.Collections.Generic;
using System.Linq;
<<<<<<< Updated upstream
=======
using System.Text.Json;
>>>>>>> Stashed changes
using System.Threading.Tasks;
using Core.References;
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

        public ReferencesController(IReferenceService referenceService)
        {
            _referenceService = referenceService;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id)
        {
            var data = (await _referenceService.All(id))
                .Select(referenceViewModel => new ReferenceViewModel
                {
                    Id = referenceViewModel.Id,
<<<<<<< Updated upstream
                    Motive = referenceViewModel.Motive,
                    Description_Motive = referenceViewModel.Description_Motive,
                    Symptoms = referenceViewModel.Symptoms,
                    Medical_Summary = referenceViewModel.Medical_Summary,
                    Vital_Signs = referenceViewModel.Vital_Signs,
                    Ob_Gyn = referenceViewModel.Ob_Gyn,
                    Physical_Examination = referenceViewModel.Physical_Examination,
                    Complementary_Exams = referenceViewModel.Complementary_Exams,
                    Diagnostic_Impression = referenceViewModel.Diagnostic_Impression,
                    Observations = referenceViewModel.Observations,
                    Risk = referenceViewModel.Risk,
                    Attention_Required = referenceViewModel.Attention_Required,
                    Made_By = referenceViewModel.Made_By,
                    Contacted_HF = referenceViewModel.Contacted_HF,
                    Contact_ID = referenceViewModel.Contact_ID,
=======
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
            var reference = new Reference
            {
                Id = referenceViewModel.Id,
                Motive = referenceViewModel.Motive,
                Description_Motive = referenceViewModel.Description_Motive,
                Symptoms = referenceViewModel.Symptoms,
                Medical_Summary = referenceViewModel.Medical_Summary,
                Vital_Signs = referenceViewModel.Vital_Signs,
                Ob_Gyn = referenceViewModel.Ob_Gyn,
                Physical_Examination = referenceViewModel.Physical_Examination,
                Complementary_Exams = referenceViewModel.Complementary_Exams,
                Diagnostic_Impression = referenceViewModel.Diagnostic_Impression,
                Observations = referenceViewModel.Observations,
                Risk = referenceViewModel.Risk,
                Attention_Required = referenceViewModel.Attention_Required,
                Made_By = referenceViewModel.Made_By,
                Contacted_HF = referenceViewModel.Contacted_HF,
                Contact_ID = referenceViewModel.Contact_ID,
                Date = referenceViewModel.Date,
=======
            string vitalSignsFormJson;
            vitalSignsFormJson = JsonSerializer.Serialize(referenceViewModel.VitalSigns);

            string obgynFormJson;
            obgynFormJson = JsonSerializer.Serialize(referenceViewModel.ObGyn);

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
                    VitalSigns = vitalSignsFormJson,
                    ObGyn = obgynFormJson,
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
>>>>>>> Stashed changes

            };

            await _referenceService.Create(reference);
        }

    }
}
