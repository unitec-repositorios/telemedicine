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
        private readonly PatientViewModel[] patients =
        {
            new PatientViewModel
            {
               Id = 1,
               IdNumber =  "0501199802810",
               IdRecord =  452,
               Name = "William Fernando",
               FirstLastName = "Portillo",    
               SecondLastName = "Portillo2",
               DateOfBirth = "19980118",
               Email = "william@email.com",
               Gender = "Masculino",
               Address =  "Colonia las colinas",
            },
            new PatientViewModel
            {
               Id = 2,
               IdNumber =  "0000-0000-00000",
               IdRecord =  189,
               Name = "Christopher",
               FirstLastName = "Ecalon",
               SecondLastName = "Escalon 2",
               DateOfBirth = "23-04-1997",
               Email = "escalon@email.com",
               Gender = "Masculino",
               Address = "Colonia las colinas",
            }
        };

        [HttpGet()]
        public IEnumerable<PatientViewModel> Get()
        {
            return patients;
        }

        [HttpGet("{id}")]
        public ActionResult<PatientViewModel> Get(int? id)
        {
            if (id == null)
                return BadRequest("the id parameter can't be null");


            return patients[id.Value - 1];
        }

        /*
         *  // GET
        [HttpGet("{id:int?}")]
        public IEnumerable<PatientViewModel> Get(int? id)
        {
            return _patients
                .Where(x => id == null || x.Id == id);
        }

        [HttpGet("{idNumber:string?}")]
        public IEnumerable<PatientViewModel> GetIdNumber([FromQuery] string? idNumber)
        {
            return _patients
                .Where(x => idNumber == null || x.IdNumber == idNumber);
        }
         * 
         */


        [HttpPost]
        public IActionResult Post(PatientViewModel patientViewModel)
        {
            return Ok();
        }
    }
}
