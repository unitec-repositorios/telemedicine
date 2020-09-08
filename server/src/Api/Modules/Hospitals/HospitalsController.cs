using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Modules.Hospitals;
using Core.Hospitals;
using Domain.Aggregates.Hospitals;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Networks
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalsController : Controller
    {
        private readonly IHospitalService _hospitalService;

        public HospitalsController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }

        

        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id, [FromQuery] int? code)
        {
            var data = (await _hospitalService.All(id, code))
                .Select(hospital => new HospitalViewModel
                {
                    Id = hospital.Id,
                    Code = hospital.Code,
                    Name = hospital.Name,
                    Address = hospital.Address,
                    Department = hospital.Department,
                    City = hospital.City,
                    Category = hospital.Category,
                    Contacts = hospital.Contacts,
                    Services = hospital.Services,
                    Network = hospital.Network
                });

            return Ok(data);
        }

        [HttpPost]
        public async Task Post(HospitalViewModel hospitalViewModel)
        {
            var hospital = new Hospital
            {
                Code = hospitalViewModel.Code,
                Name = hospitalViewModel.Name,
                Address = hospitalViewModel.Address,
                Department = hospitalViewModel.Department,
                City = hospitalViewModel.City,
                Category = hospitalViewModel.Category,
                Contacts = hospitalViewModel.Contacts,
                Services = hospitalViewModel.Services,
                Network = hospitalViewModel.Network
            };

            await _hospitalService.Create(hospital);
        }


        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _hospitalService.Remove(id);
        }

        [HttpPut("{id:int}")]
        public async Task Put(int id, [FromBody] HospitalViewModel hospitalViewModel)
        {
            var hospital = new Hospital
            {
                Id = hospitalViewModel.Id,
                Code = hospitalViewModel.Code,
                Name = hospitalViewModel.Name,
                Address = hospitalViewModel.Address,
                Department = hospitalViewModel.Department,
                City = hospitalViewModel.City,
                Category = hospitalViewModel.Category,
                Contacts = hospitalViewModel.Contacts,
                Services = hospitalViewModel.Services,
                Network = hospitalViewModel.Network
            };
            await _hospitalService.Update(id, hospital);
        }
    }
}