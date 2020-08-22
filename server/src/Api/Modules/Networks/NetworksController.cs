using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Networks
{
    [ApiController]
    [Route("[controller]")]
    public class NetworksController : Controller
    {
        private readonly NetworkViewModel[] networks =
        {
            new NetworkViewModel
            {
                Id = 1,
                Name = "El Progreso",
                City = "El Progreso"
            },
            new NetworkViewModel
            {
                Id = 2,
                Name = "SPS",
                City = "San Pedro Sula"
            },
            new NetworkViewModel
            {
                Id = 3,
                Name = "La Ceiba",
                City = "La Ceiba"
            }
        };

        // GET
        [HttpGet()]
        public IEnumerable<NetworkViewModel> Get()
        {
            return networks;
        }

        [HttpGet("{id}")]
        public ActionResult<NetworkViewModel> Get(int? id)
        {
            if (id == null)
            {
                return BadRequest("the id parameter can't be null");
            }

            return networks[id.Value - 1];
        }

        //localhost:5000/networks
        [HttpPost]
        public IActionResult Post(NetworkViewModel networkViewModel)
        {
            return Ok();
        }
    }
}