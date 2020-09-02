using Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Aggregates.ReferencesACS_PS
{
    public class ReferenceACS_PS : BaseEntity, IAggregateRoot
    {
        public DateTime Date { get; set; }
        public string Community { get; set; }
        public string Patient_ID { get; set; }
        public string Motive { get; set; }
        public string Referrer { get; set; }
        public string Referrer_Phone { get; set; }
        public string Referrer_Email { get; set; }
        public string Action_Taken { get; set; }
        public string Origin_HF_ID { get; set; }
        public string Destination_HF_ID { get; set; }


    }
}
