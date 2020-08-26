﻿using Domain.Aggregates.Hospitals;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Core.Hospitals
{
    public interface IHospitalService
    {
        public Task<Hospital> FindById(int id);

        public Task Create(Hospital network);

        public Task<IEnumerable<Hospital>> All(int? id);

        public Task Remove(int id);

        public Task Update(int id, Hospital hospital);
    }
}
