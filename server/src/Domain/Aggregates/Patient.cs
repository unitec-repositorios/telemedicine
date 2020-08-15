using Domain.Contracts;

namespace Domain.Aggregates
{
    public class Patient : BaseEntity, IAggregateRoot
    {
        public string Name { get; set; }
    }
}