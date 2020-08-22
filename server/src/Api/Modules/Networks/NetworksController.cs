using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Api.Modules.Networks
{
    [ApiController]
    [Route("[controller]")]
    public class NetworksController : Controller
    {
        // GET
        public IEnumerable<NetworkViewModel> Get()
        {
            return new[]
            {
                new NetworkViewModel
                {
                    Id = 1,
                    Name = "El Progreso",
                    City = "El Progreso"
                }
            };
        }

        //localhost:5000/networks
        [HttpPost]
        public IActionResult Post(NetworkViewModel networkViewModel)
        {
            return Ok();
        }
    }
}