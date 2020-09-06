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
        public bool ContactedHf { get; set; }
        public string ContactId { get; set; }
        public DateTime Date { get; set; }
    }
}