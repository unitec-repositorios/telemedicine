import axios from "axios";
import { CreateHospital, Hospital } from "./hospitalModels";

const baseUrl: string = `hospitals/${process.env.REACT_APP_BASE_URL}`;

export async function create(hospital: CreateHospital) {
  await axios.post(baseUrl, hospital);
}

export async function getDataAxios(){
  const response =
    await axios.get("https://localhost:44392/hospitals")
  console.log(response.data)
}



export async function all() {
  const response = await axios.get("localhost:44392/");

  return response.data as Hospital[];
}