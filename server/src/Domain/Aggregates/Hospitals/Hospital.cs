using Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Aggregates.Hospitals
{
    public class Hospital : BaseEntity, IAggregateRoot
    {
        public int Code { get; set; }
        public string Name { get; set; }
        public string Neighborhood { get; set; }
        public string City { get; set; }
        public string Department { get; set; }
    }
}
