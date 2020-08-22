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
