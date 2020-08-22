using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Patients
{
    [ApiController]
    [Route("[controller]")]
    public class PatientsController : Controller
    {
        
        public IEnumerable<PatientViewModel> Get()
        {
            return new[]
            {
                new PatientViewModel
                {
                    Id = 1,
                    FirstName = "William",
                    LastName = "Portillo",
                    Code = "p00"
                }
            };
        }
        [HttpPost]
        public IActionResult Post(PatientViewModel patientViewModel)
        {
            return Ok();
        }
    }
}
