export interface Patient {
  id: number;
  idNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  address: string;
}

export interface CreatePatient {
  idNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  address: string;
}

export interface UpdatePatient {
  idNumber: string;
  name: string;
  firstLastName: string;
  secondLastName: string;
  dateOfBirth: Date;
  email: string;
  gender: string;
  address: string;
}
