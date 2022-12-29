import { logOut, setCredentials } from 'store/slices/authSlice';
import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signin: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signin',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    signOut: builder.mutation({
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
    refresh: builder.mutation({
      query: () => ({
        url: '/refresh',
        method: 'GET'
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data: { accessToken } } = await queryFulfilled;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      }
    })
  }),
});

export const { useSigninMutation, useSignOutMutation, useRefreshMutation } = authApiSlice;
