import { perPage } from 'constants/pagination';
import { TLookbooksDataRes } from 'types/lookbook';
import { axiosInstance } from './axios';

export const getLookbooks = async (currentPage: number): Promise<TLookbooksDataRes> => {
  const { data } = await axiosInstance.get(
    `/lookbooks?currentPage=${currentPage}&perPage=${perPage}`,
  );

  return data;
};
