import axios from "axios";
import { CreateHospital, Hospital } from "./hospitalModels";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/hospitals`;

export async function create(network: CreateHospital) {
  await axios.post(baseUrl, network);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as Hospital[];
}
