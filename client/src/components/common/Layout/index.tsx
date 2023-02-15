import { Footer, Header } from 'components';
import { Suspense } from 'react';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}>
        {children}
      </Suspense>
      <Footer />
    </>
  );
};
