import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { useLazyRefreshQuery } from 'store/apis/authApiSlice';
import { selectCurrentToken } from 'store/slices/authSlice';

export const PersistLogin = () => {
  const token = useSelector(selectCurrentToken);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useLazyRefreshQuery();

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

  let content = <p>hi</p>;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isError) {
    content = (
      <p>
        <Link to='/signin'>Please login again</Link>
      </p>
    );
  } else if (isSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};
