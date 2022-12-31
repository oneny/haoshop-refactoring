import { setBrands } from 'store/slices/brandSlice';
import { apiSlice } from './apiSlice';

type brandsProps = {
  _id: string;
  name: string;
  description: string;
  banner: { img: string, _id: string }[],
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  '__v': string;
  id?: string;
};

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<brandsProps[], void>({
      query: () => ({ url: '/brands' }),
      transformResponse: (responseData: { brands: brandsProps[]}) => {
        const loadedBrands = responseData.brands.map((brand) => {
          brand.id = brand._id;
          return brand;
        });
        return loadedBrands;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: 'Brand', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Brand' as const, id })),
            ]
          : [{ type: 'Brand', id: 'LIST' }];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setBrands(data));
        } catch (err) {
          console.log(err);
        }
      }
    }),
  }),
});

export const { useGetBrandsQuery } = brandApiSlice;
