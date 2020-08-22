using Domain.Aggregates.Hospitals;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Core.Hospitals
{
    public class HospitalService : IHospitalService
    {
        private readonly IHospitalRepository _hospitalRepository;

        
        public HospitalService(IHospitalRepository hospitalRepository)
        {
            _hospitalRepository = hospitalRepository;
        }

        
        public async Task<IEnumerable<Hospital>> All()
        {
            return await _hospitalRepository
                .Filter(hospital => !hospital.Disabled)
                .ToListAsync();
        }

        public async Task Create(Hospital hospital)
        {
            await _hospitalRepository.Add(hospital);
        }

        public async Task<Hospital> FindById(int id)
        {
            return await _hospitalRepository.FindById(id);
        }

        public async Task Remove(int id)
        {
            var hospital = await _hospitalRepository.FindById(id);
            await _hospitalRepository.Disable(hospital);
        }

        public async Task Update(int id, Hospital hospital)
        {
            var existingHospital = await _hospitalRepository.FindById(id);

            existingHospital.Name = hospital.Name;

            await _hospitalRepository.Update(existingHospital);
        }
    }
}
