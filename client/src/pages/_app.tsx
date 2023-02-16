import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from 'components';
import { PersistLogin } from 'components/common/PersistLogin';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/globalStyle';
import theme from 'styles/theme';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
        // useErrorBoundary: true,
      },
    },
  }));

  return (
    <>
      <Head>
        <title>HOW ABOUT OOTD</title>
      </Head>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <PersistLogin>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </PersistLogin>
              <ReactQueryDevtools />
            </ThemeProvider>
          </Hydrate >
        </QueryClientProvider>
      </Provider>
    </>
  );
}
