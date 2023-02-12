import { queryKeys } from 'constants/queryKeys';
import { setBrands } from 'store/slices/brandSlice';
import { BrandData } from 'types/brand';
import { apiSlice } from './apiSlice';

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<BrandData[], void>({
      query: () => ({ url: '/brands' }),
      transformResponse: (responseData: { brands: BrandData[] }) => {
        const loadedBrands = responseData.brands.map((brand) => {
          brand.id = brand._id;
          return brand;
        });
        return loadedBrands;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: queryKeys.brand, id: 'LIST' },
              ...result.map(({ id }) => ({ type: queryKeys.brand, id })),
            ]
          : [{ type: queryKeys.brand, id: 'LIST' }];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBrands(data));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useGetBrandsQuery } = brandApiSlice;
