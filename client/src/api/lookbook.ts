import { perPage } from 'constants/pagination';
import { TLookbookDataRes, TLookbooksDataRes } from 'types/lookbook';
import { LookbookData } from './../types/lookbook';
import { axiosInstance } from './axios';

export const getLookbooks = async (currentPage: number): Promise<TLookbooksDataRes> => {
  const { data } = await axiosInstance.get(
    `/lookbooks?currentPage=${currentPage}&perPage=${perPage}`,
  );
  return data;
};

export const getLookbook = async (id: string): Promise<LookbookData> => {
  const {
    data: { lookbook },
  } = await axiosInstance.get<TLookbookDataRes>(`/lookbooks/${id}`);

  return lookbook;
};
