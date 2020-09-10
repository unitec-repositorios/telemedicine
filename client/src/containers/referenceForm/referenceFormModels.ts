export interface CreateRRForm{
    type : string;
    originHfId: string;
    destinationHfId: string;
    patientId: string;
    motive: string;
    descriptionMotive: string;
    symptoms: string;
    medicalSummary: string;
    vitalSigns: string;
    obGyn: string;
    physicalExamination: string;
    complementaryExams: string;
    diagnosticImpression: string;
    observations: string;
    risk: boolean;
    attentionRequired: string;
    madeBy: string;
    contactedHf: string;
    contactId: string;
    date: Date;
}

export interface RRForm{
    id: number;
    type : string;
    originHfId: string;
    destinationHfId: string;
    patientId: string;
    motive: string;
    descriptionMotive: string;
    symptoms: string;
    medicalSummary: string;
    vitalSigns: JSON;
    obGyn: JSON;
    physicalExamination: JSON;
    complementaryExams: string;
    diagnosticImpression: string;
    observations: string;
    risk: boolean;
    attentionRequired: string;
    madeBy: string;
    contactedHf: string;
    contactId: string;
    date: Date;
}

export interface OriginHospital{
    name: string; 
    code: number;
}

export interface DestinationHospital{
    name: string;
    code: number;
}

export interface Reference{
    codeform: number;
    patientname: string;
    origin: string;
    destination: string;
}
