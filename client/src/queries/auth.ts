import { useMutation } from '@tanstack/react-query';
import { signin, signout } from 'api/auth';
import { store } from 'store';
import { clearCredentials } from 'store/slices/authSlice';
import { TUserInfo } from 'types/auth';
import { clearPersisted } from 'utils/persistLogin';

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: (userData: TUserInfo) => signin(userData),
  });
};

export const useSignoutMutation = () => {
  return useMutation({
    mutationFn: () => signout(),
    onSuccess: () => {
      clearPersisted()
      store.dispatch(clearCredentials())
    },
  });
};
