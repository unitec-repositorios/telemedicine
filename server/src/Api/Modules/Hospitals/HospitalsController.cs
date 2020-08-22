using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
namespace Api.Modules.Hospitals
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalsController: Controller
    {
        public IEnumerable<HospitalViewModel> Get()
        {
            return new[]
            {
                new HospitalViewModel
                {
                    Id = 1,
                    Name = "Cemesa",
                    City = "San Pedro Sula"
                }
            };
        }

        //localhost:5000/networks
        [HttpPost]
        public IActionResult Post(HospitalViewModel hospitalViewModel)
        {
            return Ok();
        }
    }
}
