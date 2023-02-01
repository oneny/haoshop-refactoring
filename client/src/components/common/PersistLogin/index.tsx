import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLazyRefreshQuery } from 'store/apis/authApiSlice';
import { selectCurrentToken } from 'store/slices/authSlice';
import { getPersisted } from 'utils/storage';

export const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);

  const [refresh, { isLoading }] = useLazyRefreshQuery();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };

    if (!token && getPersisted()) verifyRefreshToken();
  }, []);

  return <>{getPersisted() ? <Outlet /> : isLoading ? <></> : <Outlet />}</>;
};
