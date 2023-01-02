import { Product } from 'store-interfaces';
import { setProducts } from 'store/slices/productSlice';
import { apiSlice } from './apiSlice';

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (args) => ({
        url: '/products',
        method: 'POST',
        body: { ...args },
      }),
      transformResponse: (responseData: { products: Product[] }) => {
        const loadedProducts = responseData.products.map((product) => {
          product.id = product._id;
          return product;
        })
        return loadedProducts;
      },
      providesTags: (result, error, arg) => {
        return result
          ? [
              { type: 'Product', id: 'LIST' },
              ...result.map(({ id }) => ({ type: 'Product' as const, id })),
            ]
          : [{ type: 'Product', id: 'LIST' }];
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