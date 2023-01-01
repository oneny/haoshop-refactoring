import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createLinearCategory } from "utils/createLinearCategory";

type CategoryProps = {
  _id: string;
  name: string;
  slug: string;
  viewType: string;
  children: CategoryProps[];
}

type CategoryStateProps = {
  categories: CategoryProps[];
  linearCategory: CategoryProps[];
}

const initialState: CategoryStateProps = {
  categories: [],
  linearCategory: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryProps[]>) => {
      console.log('hi');
      state.categories = [...action.payload];
      state.linearCategory = createLinearCategory(action.payload);
    }
  }
})

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
