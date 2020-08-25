import axios from "axios";
import { CreatePatient, UpdatePatient, Patient } from "./patientModels";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/patients`;

export async function create(network: CreatePatient) {
  await axios.post(baseUrl, network);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as Patient[];
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);

  return response.data as Patient;
}

export async function update(network: UpdatePatient) {
  await axios.put(baseUrl);
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}
