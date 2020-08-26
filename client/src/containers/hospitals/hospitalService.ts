import axios from "axios";
import { CreateHospital, Hospital, EditHospital } from "./hospitalModels";
import { METHODS } from "http";
import { message } from 'antd';
import { tuple } from "antd/lib/_util/type";

//const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/networks`;
const baseUrl: string = `https://localhost:44392/hospitals`;

export async function PostHospital(hospital: CreateHospital) {
  await axios.post(baseUrl, hospital)
  .catch(error => {
    console.log("custom message - >",error)
    message.error('Ya existe un registro con ese nombre.',5);
    return error
  })
  .then(message.success('Se ha agregado exitosamente el registro',5));
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as Hospital[];
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);

  return response.data as Hospital;
}

export async function edit(id: number, hospital: EditHospital) {
  await axios.put(`${baseUrl}/${id}`, hospital)
  .then(message.success('Se ha editado exitosamente el registro',5));
}

export async function DeleteHospital(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
  window.location.reload(true);
  message.success('Se ha eliminado exitosamente el registro',5);
}
