import { setCategories } from "store/slices/categorySlice";
import { Category } from 'store-interfaces';
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => ({ url: '/categories' }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCategories(data));
        } catch (err) {
          console.log(err);
        }
      }
    })
  })
})

export const { useGetCategoriesQuery } = categoryApiSlice;