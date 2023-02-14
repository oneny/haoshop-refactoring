import { setCredentials } from 'store/slices/authSlice';
import { AuthData } from 'types/auth';
import { clearPersisted } from 'utils/persistLogin';
import { apiSlice } from './apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    refresh: builder.query<AuthData, void>({
      query: () => ({
        url: '/refresh',
      }),
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { accessToken },
          } = await queryFulfilled;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          clearPersisted();
        }
      },
    }),
  }),
});

export const { useLazyRefreshQuery } = authApiSlice;
