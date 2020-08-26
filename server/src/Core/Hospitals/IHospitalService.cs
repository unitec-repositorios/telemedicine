using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Domain.Aggregates.Hospitals;

namespace Core.Hospitals
{
    public interface IHospitalService
    {

        Task<Hospital> FindById(int id);

        Task Create(Hospital hospital);

        Task<IEnumerable<Hospital>> All();

        Task Remove(int id);

        Task Update(int id, Hospital hospital);
    }
}
