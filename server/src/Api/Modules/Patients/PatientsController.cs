using System.Linq;
using System.Threading.Tasks;
using Api.Modules.Networks;
using Core.Patients;
using Domain.Aggregates.Networks;
using Domain.Aggregates.Patients;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Patients
{
    [ApiController]
    [Route("[controller]")]
    public class PatientsController : Controller
    {
        private readonly IPatientService _patientService;

        public PatientsController(IPatientService patientService)
        {
            _patientService = patientService;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id)
        {
            var data = (await _patientService.All(id))
                .Select(patient => new PatientViewModel
                {
                    Id=patient.Id,
                    IdNumber = patient.IdNumber,
                    Name = patient.Name,
                    FirstLastName = patient.FirstLastName,
                    SecondLastName= patient.SecondLastName,
                    DateOfBirth= patient.DateOfBirth,
                    Email= patient.Email,
                    Gender= patient.Gender,
                    Address= patient.Address,
                    IdRecord = patient.IdRecord
                });

            return Ok(data);
        }

        [HttpPost]
        public async Task Post(PatientViewModel patientViewModel)
        {
            var patient = new Patient
            {
                
                IdNumber = patientViewModel.IdNumber,
                Name = patientViewModel.Name,
                FirstLastName = patientViewModel.FirstLastName,
                SecondLastName= patientViewModel.SecondLastName,
                DateOfBirth= patientViewModel.DateOfBirth,
                Email= patientViewModel.Email,
                Gender= patientViewModel.Gender,
                Address= patientViewModel.Address,
                IdRecord = patientViewModel.IdRecord
            };

            await _patientService.Create(patient);
        }


        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _patientService.Remove(id);
        }

        [HttpPut("{id:int}")]
        public async Task Put(int id, [FromBody] PatientViewModel patientViewModel)
        {
            var patient = new Patient
            {
                IdNumber = patientViewModel.IdNumber,
                Name = patientViewModel.Name,
                FirstLastName = patientViewModel.FirstLastName,
                SecondLastName= patientViewModel.SecondLastName,
                DateOfBirth= patientViewModel.DateOfBirth,
                Email= patientViewModel.Email,
                Gender= patientViewModel.Gender,
                Address= patientViewModel.Address,
                IdRecord = patientViewModel.IdRecord
            };
            await _patientService.Update(id, patient);
        }
    }
}