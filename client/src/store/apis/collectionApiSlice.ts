import { setCollections } from 'store/slices/collectionSlice';
import { apiSlice } from './apiSlice';

type CollectionsProps = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  launched: string;
  director: string;
  country: string;
  shop: string;
  banners: { _id: string; img: string }[];
  cards: { _id: string; img: string }[];
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

export const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<CollectionsProps[], ParamsType>({
      query: ({ currentPage, perPage }) => ({
        url: '/collections',
        params: {
          currentPage,
          perPage,
        },
      }),
      transformResponse: (responseData: {
        collections: CollectionsProps[];
      }) => {
        const loadedCollections = responseData.collections.map((brand) => {
          brand.id = brand._id;
          return brand;
        });
        return loadedCollections;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: 'Collection', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Collection' as const, id })),
            ]
          : [{ type: 'Collection', id: 'LIST' }];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCollections(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetCollectionsQuery } = collectionApiSlice;
