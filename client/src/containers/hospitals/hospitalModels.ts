export interface CreateHospital {
  name: string;
  code: number;
  address: string;
  department: string;
  city: string;
  category: string;
  contacts: string;
  services: string;
}

export interface Hospital {
  id: number;
  name: string;
  code: number;
  address: string;
  department: string;
  city: string;
  category: string;
  contacts: string;
}
