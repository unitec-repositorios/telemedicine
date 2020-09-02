using System;
using System.Collections.Generic;
using System.Linq;
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

            };

            await _referenceService.Create(reference);
        }

    }
}
