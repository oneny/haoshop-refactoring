import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BrandData, BrandState } from 'types/brand';

const initialState: BrandState = {
  brands: [],
  brand: {}
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<BrandData[]>) => {
      state.brands = [...action.payload];
    }
  },
});

export const { setBrands } = brandSlice.actions;

export default brandSlice.reducer;