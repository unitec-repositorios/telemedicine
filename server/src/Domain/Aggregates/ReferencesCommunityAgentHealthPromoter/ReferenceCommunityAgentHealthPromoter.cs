using Domain.Contracts;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Aggregates.ReferencesACS_PS
{
    public class ReferenceCommunityAgentHealthPromoter : BaseEntity, IAggregateRoot
    {
        public DateTime Date { get; set; }
        public string Community { get; set; }
        public string PatientId { get; set; }
        public string Motive { get; set; }
        public string Referrer { get; set; }
        public string ReferrerPhone { get; set; }
        public string ReferrerEmail { get; set; }
        public string ActionTaken { get; set; }
        public string OriginHfId { get; set; }
        public string DestinationHfId { get; set; }


    }
}
