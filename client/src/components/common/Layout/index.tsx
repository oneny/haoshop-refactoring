import { Outlet } from 'react-router-dom';
import { Header } from 'components';
import { Suspense } from 'react';

export const Layout = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />
      </Suspense>
    </>
  );
};
