import { LookbookData } from 'types/lookbook';
import { Pagination } from 'types/pagination';
import { setLookbooks } from 'store/slices/lookbookSlice';
import { apiSlice } from './apiSlice';

export const lookbookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookbooks: builder.query<LookbookData[], Pagination>({
      query: ({ currentPage, perPage }) => ({
        url: '/lookbooks',
        params: {
          currentPage,
          perPage,
        },
      }),
      transformResponse: (responseData: { lookbooks: LookbookData[] }) => {
        const loadedLookbooks = responseData.lookbooks.map((lookbook) => {
          lookbook.id = lookbook._id;
          return lookbook;
        });
        return loadedLookbooks;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: 'Lookbook', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Lookbook' as const, id })),
            ]
          : [{ type: 'Lookbook', id: 'LIST' }];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
           const { data } = await queryFulfilled;
           dispatch(setLookbooks(data));
        } catch (err) {
          console.log(err);
        }
      }
    }),
  }),
});

export const { useGetLookbooksQuery } = lookbookApiSlice;
