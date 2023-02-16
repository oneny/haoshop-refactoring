import { useRefreshMutation } from 'queries/auth';
import { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from 'store/slices/authSlice';
import { getPersisted } from 'utils/persistLogin';

export const PersistLogin = ({ children }: { children: ReactNode }) => {
  const token = useSelector(selectCurrentToken);
  const { mutateAsync: refresh } = useRefreshMutation();
  
  useEffect(() => {
    const persist = getPersisted();
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  return <>{children}</>;
};
