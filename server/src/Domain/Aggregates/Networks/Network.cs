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
         
        
        [Column("codigorups")]
        public int RupsCode { get; set; }
        
        
        [Column("unidad_de_salud")]
        [StringLength(30)]
        public string HealthUnit { get; set; }
        
        
        [Column("municipio")]
        [StringLength(30)]
        public string Township { get; set; }
        
        
        [Column("nueva_categorizacion")]
        [StringLength(15)]
        public string NewCategory { get; set; }

        
    }
}