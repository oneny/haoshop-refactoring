import { useMutation } from '@tanstack/react-query';
import { signin } from 'api/auth';
import { TUserInfo } from 'types/auth';

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: (userData: TUserInfo) => signin(userData),
  });
};
