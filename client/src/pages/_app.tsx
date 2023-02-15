import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Layout } from 'components';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import { store } from 'store';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/globalStyle';
import theme from 'styles/theme';

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
            <Layout>
              <Component {...pageProps} />
            </Layout>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}
