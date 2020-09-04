﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Api.Modules.References
{
    public class ReferenceViewModel
    {
        public int Id { get; set; }
<<<<<<< Updated upstream
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
=======
        public string Type { get; set; }
        public string OriginHfId { get; set; }
        public string DestinationHfId { get; set; }
        public string PatientId { get; set; }
        public string Motive { get; set; }
        public string DescriptionMotive { get; set; }
        public string Symptoms { get; set; }
        public string MedicalSummary { get; set; }
        public string VitalSigns { get; set; }
        public string ObGyn { get; set; }
        public string PhysicalExamination { get; set; }
        public string ComplementaryExams { get; set; }
        public string DiagnosticImpression { get; set; }
        public string Observations { get; set; }
        public bool Risk { get; set; }
        public string AttentionRequired { get; set; }
        public string MadeBy { get; set; }
        public string ContactedHf { get; set; }
        public string ContactId { get; set; }
>>>>>>> Stashed changes
        public DateTime Date { get; set; }
    }
}
