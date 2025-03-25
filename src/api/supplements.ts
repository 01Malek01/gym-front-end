import axios from "axios";
import { Supplement } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

export const getSupplement = async (id: string): Promise<Supplement> => {
  const response = await axios.get(`${API_URL}/supplements/${id}`);
  return response.data;
};

// Add other supplement-related API functions here