using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Networks;
using Domain.Aggregates.Networks;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Networks
{
    [ApiController]
    [Route("[controller]")]
    public class NetworksController : Controller
    {
       
        
        private readonly INetworkService _networkService;

        public NetworksController(INetworkService networkService)
        {
            _networkService = networkService;
        }


        [HttpGet("{id:int?}")]
        public async Task<IActionResult> Get(int? id, [FromQuery] int? code)
        {
            var data = (await _networkService.All(id,code))
                .Select(network => new NetworksViewModel
                {
                    Id = network.Id,
                    Name = network.Name,
                    RupsCode = network.RupsCode,
                    HealthUnit = network.HealthUnit,
                    Township = network.Township,
                    NewCategory = network.NewCategory,
                });

            return Ok(data);
        }
        
        [HttpPost]
        public async Task Post(NetworksViewModel projectViewModel)
        {
            
            var network = new Network
            {
                Id = projectViewModel.Id,
                Name = projectViewModel.Name,
                RupsCode = projectViewModel.RupsCode,
                HealthUnit = projectViewModel.HealthUnit,
                Township = projectViewModel.Township,
                NewCategory = projectViewModel.NewCategory
            };

            await _networkService.Create(network);
        }
        
        
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _networkService.Remove(id);
        }
        
        [HttpPut("{id}")]
        public async Task Edit(int id, NetworksViewModel projectViewModel)
        {
            var network = new Network
            {
                Id = projectViewModel.Id,
                Name = projectViewModel.Name,
                RupsCode = projectViewModel.RupsCode,
                HealthUnit = projectViewModel.HealthUnit,
                Township = projectViewModel.Township,
                NewCategory = projectViewModel.NewCategory

            };
            await _networkService.Update(id, network);
        }
        

    }
}