import { Footer, Header } from 'components';
import { ReactNode, Suspense } from 'react';

export function Layout({ children }: { children: ReactNode }) {
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
