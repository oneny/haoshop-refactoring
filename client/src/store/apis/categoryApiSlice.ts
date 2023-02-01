import { setCategories } from "store/slices/categorySlice";
import { CategoryData } from 'types/category';
import { apiSlice } from "./apiSlice";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryData[], void>({
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