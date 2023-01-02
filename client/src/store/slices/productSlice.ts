import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ProductState } from 'store-interfaces';

const initialState: ProductState = {
  products: [],
  product: {},
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = [...action.payload];
    }
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;