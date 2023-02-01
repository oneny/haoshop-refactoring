import { logOut, setCredentials } from 'store/slices/authSlice';
import { Auth } from 'types/auth';
import { clearPersisted } from 'utils/persistLogin';
import { apiSlice } from './apiSlice';

type SignUpParams = {
  email: string;
  password: string;
};

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation<Auth, SignUpParams>({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signOut: builder.mutation<string, void>({
      query: () => ({
        url: '/auth/signout',
        method: 'GET',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(logOut());
          clearPersisted();
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.query<Auth, void>({
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
