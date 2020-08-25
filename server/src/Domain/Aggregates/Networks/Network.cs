using Domain.Contracts;

namespace Domain.Aggregates.Networks
{
    public class Network : BaseEntity, IAggregateRoot
    {
        public string Name { get; set; }

        public int RupsCode { get; set; }

        public string HealthUnit { get; set; }

        public string Township { get; set; }

        public string NewCategory { get; set; }
    }
}