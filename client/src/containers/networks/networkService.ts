import axios from "axios";
import { CreateNetwork, Network } from "./networkModels";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/networks`;

export async function create(network: CreateNetwork) {
  await axios.post(baseUrl, network);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as Network[];
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);

  return response.data as Network;
}

export async function update(network: CreateNetwork) {
  await axios.put(baseUrl);
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}

export async function rupsCodeExists(code: number) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        code,
      },
    });

    const data = response.data as Network[];

    return data.length > 0;
  } catch (e) {
    console.log(e);
  }
}
