using Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Aggregates.Hospitals
{
    public class Hospital : BaseEntity, IAggregateRoot
    {
        public string Name { get; set; }

        public string Address { get; set; }

    }
}
