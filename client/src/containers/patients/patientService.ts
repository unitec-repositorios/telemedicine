import axios from "axios";
import { CreatePatient, Patient } from "./patientModels";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/networks`;

export async function create(network: CreatePatient) {
  await axios.post(baseUrl, network);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as Patient[];
}
