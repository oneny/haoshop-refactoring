import { AuthData, TUserInfo } from 'types/auth';
import { axiosInstance } from './axios';

export const signin = async (userInfo: TUserInfo): Promise<AuthData> => {
  const { data } = await axiosInstance.post('/auth/signin', userInfo);
  
  return data;
};
