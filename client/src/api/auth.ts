import { AuthData, TUserInfo } from 'types/auth';
import { axiosInstance, axiosWithAuth } from './axios';

export const signin = async (userInfo: TUserInfo): Promise<AuthData> => {
  const { data } = await axiosInstance.post('/auth/signin', userInfo);
  
  return data;
};

export const signout = async (): Promise<void> => {
  await axiosWithAuth.post('/auth/signout');
}