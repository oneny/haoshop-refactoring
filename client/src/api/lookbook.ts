import { LookbookData } from "types/lookbook";
import { axiosInstance } from "./axios";

export const getLookbooks = async (): Promise<LookbookData[]> => {
  const { data } = await axiosInstance.get('/lookbooks');

  return data;
}