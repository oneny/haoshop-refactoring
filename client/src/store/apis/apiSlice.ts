import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { RootState } from 'store';
import { setCredentials } from 'store/slices/authSlice';

type TokenProps = {
  accessToken: string;
};

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 403) {
    const refreshResult = await baseQuery('/refresh', api, extraOptions);

    if (refreshResult?.data) {
      api.dispatch(setCredentials({ ...refreshResult.data } as TokenProps));
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data = 'Your login has expired.';
      }
      return refreshResult;
    }
  }
  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Brand', 'Collection', 'Lookbook', 'Product'],
  endpoints: (builder) => ({}),
});
