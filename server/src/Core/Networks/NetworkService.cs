using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Aggregates.Networks;
using Microsoft.EntityFrameworkCore;

namespace Core.Networks
{
    public class NetworkService : INetworkService
    {
        private readonly INetworkRepository _networkRepository;


        public NetworkService(INetworkRepository networkRepository)
        {
            _networkRepository = networkRepository;
        }
        
        
        public async Task<Network> FindById(int id)
        {
            return await _networkRepository.FindById(id);
        }

        public async Task<IEnumerable<Network>> All(int? id ,int? code)
        {
            return await _networkRepository
                .Filter(network => !network.Disabled).Where(x => id == null || x.Id == id)
                .Where(x => code == null || x.RupsCode == code).ToListAsync();
        }

        public async Task Remove(int id)
        {
            var network = await _networkRepository.FindById(id);
            await _networkRepository.Disable(network);
        }

        public async Task Update(int id, Network network)
        {
            var updateNetwork = await _networkRepository.FindById(id);

            updateNetwork.Name = network.Name;
            updateNetwork.RupsCode = network.RupsCode;
            updateNetwork.HealthUnit = network.HealthUnit;
            updateNetwork.Township = network.Township;
            updateNetwork.NewCategory = network.NewCategory;
            
            await _networkRepository.Update(updateNetwork);
        }

        public async Task Create(Network network)
        {
            var newnetwork = new Network
            {
                Name = network.Name,
                RupsCode = network.RupsCode,
                HealthUnit = network.HealthUnit,
                Township = network.Township,
                NewCategory = network.NewCategory
            };

            await _networkRepository.Add(newnetwork);
        }
        
    }
}