import { useMutation } from '@tanstack/react-query';
import { refresh, signin, signout } from 'api/auth';
import { store } from 'store';
import { clearCredentials, setCredentials } from 'store/slices/authSlice';
import { TUserInfo } from 'types/auth';
import { clearPersisted, setPersisted } from 'utils/persistLogin';

export const useSigninMutation = () => {
  return useMutation({
    mutationFn: (userData: TUserInfo) => signin(userData),
    onSuccess: (data) => {
      store.dispatch(setCredentials(data));
      setPersisted(true);
    }
  });
};

export const useSignoutMutation = () => {
  return useMutation({
    mutationFn: () => signout(),
    onSuccess: () => {
      clearPersisted();
      store.dispatch(clearCredentials());
    },
  });
};

export const useRefreshMutation = () => {
  return useMutation({
    mutationFn: () => refresh(),
    onSuccess: (data) => {
      store.dispatch(setCredentials(data));
    },
  });
};
