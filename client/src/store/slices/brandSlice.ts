import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Brand, BrandState } from 'store-interfaces';

const initialState: BrandState = {
  brands: [],
  brand: {}
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<Brand[]>) => {
      state.brands = [...action.payload];
    }
  },
});

export const { setBrands } = brandSlice.actions;

export default brandSlice.reducer;