import { queryTags } from 'constants/queryTags';
import { setProducts } from 'store/slices/productSlice';
import { ProductData } from 'types/product';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => ({
        url: '/products',
        method: 'POST',
        body: { ...args },
      }),
      transformResponse: (responseData: { products: ProductData[] }) => {
        const loadedProducts = responseData.products.map((product) => {
          product.id = product._id;
          return product;
        })
        return loadedProducts;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: queryTags.product, id: 'LIST' },
              ...result.map(({ id }) => ({ type: queryTags.product, id })),
            ]
          : [{ type: queryTags.product, id: 'LIST' }];
      },
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setProducts(data));
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
})

export const { useGetProductsQuery } = productApiSlice;