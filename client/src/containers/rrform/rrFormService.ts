import axios from "axios";
import { CreateRRForm, RRForm } from "./rrFormModels";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/references`;

export async function create(form: CreateRRForm) {
  await axios.post(baseUrl, form);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as RRForm[];
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return (response.data as RRForm[])[0];
  // return response.data as Hospital;
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}