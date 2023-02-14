import { useRefreshMutation } from 'queries/auth';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectCurrentToken } from 'store/slices/authSlice';
import { getPersisted } from 'utils/persistLogin';

export const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);
  const persist = getPersisted();
  const { mutateAsync: refresh} = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && persist) verifyRefreshToken();
  }, []);

  return <Outlet />;
};
