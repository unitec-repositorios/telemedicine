using Domain.Aggregates.Networks;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
namespace Core.Networks
{
    public interface  INetworkService
    {
       public  Task<Network> FindById(int id);

        public Task Create(Network network);

        public Task<IEnumerable<Network>> All(int? id, int? code);

        public Task Remove(int id);

        public Task Update(int id, Network network);
    }
}