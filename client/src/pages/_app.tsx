import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from 'components';
import { PersistLogin } from 'components/common/PersistLogin';
import { useAppSelector } from 'hooks';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRefreshMutation } from 'queries/auth';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from 'store';
import { selectCurrentToken } from 'store/slices/authSlice';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/globalStyle';
import theme from 'styles/theme';
import { getPersisted } from 'utils/persistLogin';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      // useErrorBoundary: true,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>HOW ABOUT OOTD</title>
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <QueryClientProvider client={queryClient}>
            <PersistLogin>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </PersistLogin>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
