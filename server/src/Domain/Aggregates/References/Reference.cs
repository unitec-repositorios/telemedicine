using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using Domain.Contracts;

namespace Domain.Aggregates.Reference
{
    public class Reference : BaseEntity, IAggregateRoot
    {
        public string Type { get; set; }
        public string Origin_HF_ID { get; set; }
        public string Destination_HF_ID { get; set; }
        public string Patient_ID { get; set; }
        public string Motive { get; set; }
        public string Description_Motive { get; set; }
        public string Symptoms { get; set; }
        public string Medical_Summary { get; set; }

        [JsonPropertyName("Vital_Signs")]
        public string Vital_Signs { get; set; }

        [JsonPropertyName("Ob_Gyn")]
        public string Ob_Gyn { get; set; }

        [JsonPropertyName("Physical_Examination")]
        public string Physical_Examination { get; set; }
        public string Complementary_Exams { get; set; }
        public string Diagnostic_Impression { get; set; }
        public string Observations { get; set; }
        public bool Risk { get; set; }
        public string Attention_Required { get; set; }
        public string Made_By { get; set; }
        public string Contacted_HF { get; set; }
        public string Contact_ID { get; set; }
        public DateTime Date { get; set; }


    }
}
