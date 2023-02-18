import { Footer, Header, QueryErrorResetBoundary } from 'components';
import { ReactNode, Suspense } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <QueryErrorResetBoundary>
        <Suspense fallback={<p>Loading...</p>}>{children}</Suspense>
      </QueryErrorResetBoundary>
      <Footer />
    </>
  );
}
