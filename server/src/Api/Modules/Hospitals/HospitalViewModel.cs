
using System.ComponentModel.DataAnnotations.Schema;

namespace Api.Modules.Hospitals
{
    public class HospitalViewModel
    {
        public int Id { get; set; }

        public int Code { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string City { get; set; }

        public string Department { get; set; }

        public string Category { get; set; }
        [Column(TypeName = "jsonb")]

        public string Contacts { get; set; }
    }
}
