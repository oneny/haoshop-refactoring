import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useLazyRefreshQuery } from 'store/apis/authApiSlice';
import { selectCurrentToken } from 'store/slices/authSlice';

export const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);

  const [refresh] = useLazyRefreshQuery();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };
    if (!token) verifyRefreshToken();
  }, []);

  return <Outlet />;
};
