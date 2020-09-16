using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Modules.ReferencesCommunityAgentHealthPromoter
{
    public class ReferenceCommunityAgentAndHealthPromoterViewModel
    {
        public int Id { get; set; }

        public string Patient { get; set; }

        public string Origin { get; set; }

        public string Destination { get; set; }
    }
}
