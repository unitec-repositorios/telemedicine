import axios from "axios";
import {
  CreateReferenceACSPSForm,
  ReferenceACSPSForm,
  Reference,
} from "./referenceCommunityAgentHealthPromoterModel";

const baseUrl: string = `${process.env.REACT_APP_BASE_URL}/referencesCommunityAgentHealthPromoter`;

export async function create(form: CreateReferenceACSPSForm) {
  await axios.post(baseUrl, form);
}

export async function all() {
  const response = await axios.get(baseUrl);

  return response.data as ReferenceACSPSForm[];
}

export async function findById(id: number) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return (response.data as ReferenceACSPSForm[])[0];
}

export async function remove(id: number) {
  await axios.delete(`${baseUrl}/${id}`);
}

export async function allR() {
  const response = await axios.get(baseUrl);
  return response.data as Reference[];
}
