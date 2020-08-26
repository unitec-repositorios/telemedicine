export interface CreateHospital {
  name: string;
  code: number;
  neighborhood: string;
  department: string;
  city: string;
}

export interface Hospital {
  id: number;
  name: string;
  code: number;
  neighborhood: string;
  department: string;
  city: string;
}
