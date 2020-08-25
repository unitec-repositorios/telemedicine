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
        public async Task<IActionResult> Get(int? id)
        {
            var data = (await _networkService.All(id))
                .Select(network => new NetworkViewModel
                {
                    Id = network.Id,
                    Name = network.Name,
                });

            return Ok(data);
        }

        [HttpPost]
        public async Task Post(NetworkViewModel projectViewModel)
        {
            var network = new Network
            {
                Name = projectViewModel.Name,
            };

            await _networkService.Create(network);
        }


        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await _networkService.Remove(id);
        }

        [HttpPut("{id:int}")]
        public async Task Put(int id, [FromBody] NetworkViewModel projectViewModel)
        {
            var network = new Network
            {
                Id = projectViewModel.Id,
                Name = projectViewModel.Name,
            };
            await _networkService.Update(id, network);
        }
    }
}