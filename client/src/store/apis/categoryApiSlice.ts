import { setCategories } from "store/slices/categorySlice";
import { apiSlice } from "./apiSlice";

type CategoryProps = {
  _id: string;
  name: string;
  slug: string;
  viewType: string;
  children: CategoryProps[];
}

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<CategoryProps[], void>({
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