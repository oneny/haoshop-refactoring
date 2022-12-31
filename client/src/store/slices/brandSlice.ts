import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Action } from '@remix-run/router';

type BrandProps = {
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

type BrandStateProps = {
  brands: BrandProps[];
  brand: BrandStateProps | {};
}

const initialState: BrandStateProps = {
  brands: [],
  brand: {}
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    setBrands: (state, action: PayloadAction<BrandProps[]>) => {
      state.brands = [...action.payload];
    }
  },
});

export const { setBrands } = brandSlice.actions;

export default brandSlice.reducer;