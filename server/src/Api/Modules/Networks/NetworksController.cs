using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Networks
{
    [ApiController]
    [Route("[controller]")]
    public class NetworksController : Controller
    {
        private readonly NetworkViewModel[] _networks =
        {
            new NetworkViewModel
            {
                Id = 1,
                Name = "El Progreso",
                City = "El Progreso",
                Code = 2121
            },
            new NetworkViewModel
            {
                Id = 2,
                Name = "SPS",
                City = "San Pedro Sula",
                Code = 2020
            },
            new NetworkViewModel
            {
                Id = 3,
                Name = "La Ceiba",
                City = "La Ceiba",
                Code = 3030
            }
        };


        // GET
        [HttpGet("{id:int?}")]
        public IEnumerable<NetworkViewModel> Get(int? id, [FromQuery] int? code)
        {
            return _networks
                .Where(x => id == null || x.Id == id)
                .Where(x => code == null || x.Code == code);
        }

        //localhost:5000/networks
        [HttpPost]
        public IActionResult Post(NetworkViewModel networkViewModel)
        {
            return Ok();
        }
    }
}