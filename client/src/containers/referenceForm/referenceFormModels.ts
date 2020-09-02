export interface CreateRRForm{
    Type : string;
    Origin_HF_ID: string;
    Destination_HF_ID: string;
    Patient_ID: string;
    Motive: string;
    Description_Motive: string;
    Symptoms: string;
    Medical_Summary: string;
    Vital_Signs: JSON;
    Ob_Gyn: JSON;
    Physical_Examination: JSON;
    Complementary_Exams: string;
    Diagnostic_Impression: string;
    Observations: string;
    Risk: boolean;
    Attention_Required: string;
    Made_By: string;
    Contacted_HF: string;
    Contact_ID: string;
    Date: Date;
}

export interface RRForm{
    id: number;
    Type : string;
    Origin_HF_ID: string;
    Destination_HF_ID: string;
    Patient_ID: string;
    Motive: string;
    Description_Motive: string;
    Symptoms: string;
    Medical_Summary: string;
    Vital_Signs: JSON;
    Ob_Gyn: JSON;
    Physical_Examination: JSON;
    Complementary_Exams: string;
    Diagnostic_Impression: string;
    Observations: string;
    Risk: boolean;
    Attention_Required: string;
    Made_By: string;
    Contacted_HF: string;
    Contact_ID: string;
    Date: Date;
}