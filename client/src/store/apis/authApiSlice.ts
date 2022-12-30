import { logOut, setCredentials } from 'store/slices/authSlice';
import { apiSlice } from './apiSlice';

type AccessTokenProps = {
  accessToken: string;
};

type SignUpProps = {
  email: string;
  password: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<AccessTokenProps, SignUpProps>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signOut: builder.mutation<string, void>({
      query: () => ({
        url: '/signout',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logOut());
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.query<AccessTokenProps, void>({
      query: () => ({
        url: '/refresh',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken },
          } = await queryFulfilled;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {}
      },
    }),
  }),
});

export const { useSigninMutation, useSignOutMutation, useLazyRefreshQuery } =
  authApiSlice;
