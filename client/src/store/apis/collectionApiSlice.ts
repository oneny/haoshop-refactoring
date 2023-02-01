import { setCollections } from 'store/slices/collectionSlice';
import { CollectionData } from 'types/collection';
import { Pagination } from 'types/pagination';
import { apiSlice } from './apiSlice';

export const collectionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCollections: builder.query<CollectionData[], Pagination>({
      query: ({ currentPage, perPage }) => ({
        url: '/collections',
        params: {
          currentPage,
          perPage,
        },
      }),
      transformResponse: (responseData: {
        collections: CollectionData[];
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
