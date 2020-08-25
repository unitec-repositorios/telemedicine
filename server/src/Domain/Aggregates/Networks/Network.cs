using Domain.Contracts;

namespace Domain.Aggregates.Networks
{
    public class Network : BaseEntity, IAggregateRoot
    {
        public string Name { get; set; }
    }
}