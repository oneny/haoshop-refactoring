import { setLookbooks } from 'store/slices/lookbookSlice';
import { apiSlice } from './apiSlice';

type LookbookProps = {
  _id: string;
  name: string;
  description: string;
  modelInfo: string;
  wearingSize: string;
  banners: { _id: string; img: string }[];
  products: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

type ParamsType = {
  currentPage: number;
  perPage: number;
};

const lookbookApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getLookbooks: builder.query<LookbookProps[], ParamsType>({
      query: ({ currentPage, perPage }) => ({
        url: '/lookbooks',
        params: {
          currentPage,
          perPage,
        },
      }),
      transformResponse: (responseData: { lookbooks: LookbookProps[] }) => {
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
