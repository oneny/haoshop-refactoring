import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createLinearCategory } from "utils/createLinearCategory";
import { CategoryData, CategoryState } from "types/category";

const initialState: CategoryState = {
  categories: [],
  linearCategory: [],
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<CategoryData[]>) => {
      state.categories = [...action.payload];
      state.linearCategory = createLinearCategory(action.payload);
    }
  }
})

export const { setCategories } = categorySlice.actions;

export default categorySlice.reducer;
