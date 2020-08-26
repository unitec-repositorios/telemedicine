using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using Domain.Aggregates.Hospitals;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Core.Hospitals
{
    public class HospitalService : IHospitalService
    {
        private readonly IHospitalRepository _hospitalRepository;

        public HospitalService(IHospitalRepository hospitalRepository)
        {
            _hospitalRepository =  hospitalRepository;
        }


        public async Task<Hospital> FindById(int id)
        {
            return await _hospitalRepository.FindById(id);
        }

        public async Task<IEnumerable<Hospital>> All(int? id)
        {
            return await _hospitalRepository
                .Filter(hospital => !hospital.Disabled)
                .Where(x => id == null || x.Id == id)
                .ToListAsync();
        }

        public async Task Remove(int id)
        {
            var hospital = await _hospitalRepository.FindById(id);
            await _hospitalRepository.Disable(hospital);
        }

        public async Task Update(int id, Hospital hospital)
        {
            var updateHospital = await _hospitalRepository.FindById(id);
            updateHospital.Code = hospital.Code;
            updateHospital.Name = hospital.Name;
            updateHospital.Neighborhood = hospital.Neighborhood;
            updateHospital.Department = hospital.Department;
            updateHospital.City = hospital.City;
            await _hospitalRepository.Update(updateHospital);
        }

        public async Task Create(Hospital hospital)
        {
            var newHospital = new Hospital
            {
                Code = hospital.Code,
                Name = hospital.Name,
                Neighborhood = hospital.Neighborhood,
                Department = hospital.Department,
                City = hospital.City,
            };

            await _hospitalRepository.Add(newHospital);
        }
    }
}
