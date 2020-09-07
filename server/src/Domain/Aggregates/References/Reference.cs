using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
using System.Text.Json.Serialization;
using Domain.Aggregates.Patients;
using Domain.Contracts;

namespace Domain.Aggregates.Reference
{
    public class Reference : BaseEntity, IAggregateRoot
    {
        public string Type { get; set; }
        public string OriginHfId { get; set; }
        public string DestinationHfId { get; set; }
        public string PatientId { get; set; }
        public string Motive { get; set; }
        public string DescriptionMotive { get; set; }
        public string Symptoms { get; set; }
        public string MedicalSummary { get; set; }

        [Column(TypeName = "json")]
        public string VitalSigns { get; set; }

        [Column(TypeName = "json")]
        public string ObGyn { get; set; }

        [Column(TypeName = "json")]
        public string PhysicalExamination { get; set; }
        public string ComplementaryExams { get; set; }
        public string DiagnosticImpression { get; set; }
        public string Observations { get; set; }
        public bool Risk { get; set; }
        public string AttentionRequired { get; set; }
        public string MadeBy { get; set; }
        public bool ContactedHf { get; set; }
        public string ContactId { get; set; }
        public DateTime Date { get; set; }

        public Patient  Patient { get; set; }


    }
}
