using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Hospitals;
using Api.Models;
using Microsoft.AspNetCore.Mvc;
using Domain.Aggregates.Hospitals;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    public class HospitalsController : Controller
    {
        private readonly IHospitalService _hospitalService;

        public HospitalsController(IHospitalService hospitalService)
        {
            _hospitalService = hospitalService;
        }


        [HttpGet]
        public async Task<IActionResult> All()
        {
            var data = (await _hospitalService.All())
                .Select(campus => new HospitalsViewModel
                {
                    Id = campus.Id,
                    Name = campus.Name,
                    Address = campus.Address,
                });

            return Ok(data);
        }

        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            return Ok(await _hospitalService.FindById(id));
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<ActionResult> Create(HospitalsViewModel hospitalViewModel)
        {
            var existingCampus = await _hospitalService.FindById(hospitalViewModel.Id);


            if (existingCampus == null)
            {
                var hospital = new Hospital
                {
                    Name = hospitalViewModel.Name,
                    Address = hospitalViewModel.Address
                };
                await _hospitalService.Create(hospital);
                return Ok();
            }
            else
            {
                return BadRequest("Ya existe un hospital con este codigo");
            }

        }

        [HttpDelete]
        public async Task Delete(int id)
        {
            await _hospitalService.Remove(id);
        }

        [HttpGet]
        public IActionResult Edit(int id)
        {
            return View(id);
        }

        [HttpPut]
        public async Task<ActionResult> Edit(int id, HospitalsViewModel hospitalsViewModel)
        {
            var temp = await _hospitalService.FindById(id);
            var existingHospital = await _hospitalService.FindById(hospitalsViewModel.Id);
            if (existingHospital == null || temp.Id == existingHospital.Id)
            {
                var hospital = new Hospital
                {
                    Name = hospitalsViewModel.Name,
                    Address = hospitalsViewModel.Address
                };
                await _hospitalService.Update(id, hospital);
                return Ok();
            }
            else
            {
                return BadRequest("Ya existe un hospital con este codigo");
            }

        }
    }
}
