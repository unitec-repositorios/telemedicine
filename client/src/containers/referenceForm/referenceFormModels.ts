export interface CreateRRForm {
  type: string;
  originHfId: number;
  destinationHfId: number;
  institution: string;
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
  contactedHf: boolean;
  contactId: string;
  date: Date;
}

export interface RRForm {
  id: number;
  type: string;
  originHfId: number;
  destinationHfId: number;
  institution: string;
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
  contactedHf: boolean;
  contactId: string;
  date: Date;
}
export interface Reference {
  id: number;
  patient: string;
  originHfId: number;
  destinationHfId: number;
}
