using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Data.Contexts;
using Domain.Aggregates.Hospitals;
using System.Collections.Specialized;

namespace Api.Modules
{
    [Route("[controller]")]
    [ApiController]
    public class HospitalsController : ControllerBase
    {
        private readonly TelemedicineContext _hospitalService;

        public HospitalsController(TelemedicineContext hospitalService)
        {
            _hospitalService = hospitalService;
        }

        // GET: /Hospitals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hospital>>> GetHospital()
        {
            return await _hospitalService.Hospital.ToListAsync();
        }

        // GET: /Hospitals/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Hospital>> GetHospital(int id)
        {
            var hospital = await _hospitalService.Hospital.FindAsync(id);

            if (hospital == null)
            {
                return NotFound();
            }

            return hospital;
        }

        // PUT: /Hospitals/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHospital(int id, Hospital hospital)
        {

            hospital.Id = id;

            _hospitalService.Entry(hospital).State = EntityState.Modified;

            try
            {
                await _hospitalService.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HospitalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpPost]
        public async Task<ActionResult<Hospital>> PostHospital(Hospital hospital)
        {
            var existHospital = validationHospitalExist(hospital.Name);

            if(existHospital == true)
            {
                return NotFound();
            }

            _hospitalService.Hospital.Add(hospital);
            await _hospitalService.SaveChangesAsync();

            return CreatedAtAction("GetHospital", new { id = hospital.Id }, hospital);
        }

        // DELETE: /Hospitals/id
        [HttpDelete("{id}")]
        public async Task<ActionResult<Hospital>> DeleteHospital(int id)
        {
            var hospital = await _hospitalService.Hospital.FindAsync(id);
            if (hospital == null)
            {
                return NotFound();
            }

            _hospitalService.Hospital.Remove(hospital);
            await _hospitalService.SaveChangesAsync();

            return hospital;
        }

        private bool validationHospitalExist(string name)
        {
            return _hospitalService.Hospital.Any(e => e.Name.ToLower() == name.ToLower());
        }

        private bool HospitalExists(int id)
        {
            return _hospitalService.Hospital.Any(e => e.Id == id);
        }
    }
}
