using Domain.Contracts;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Aggregates.Networks
{
    [Table("red")]
    public class Network :BaseEntity, IAggregateRoot
    {
        [Column("nombrered")]
        [StringLength(25)]
        public string Name { get; set; }
    }
}