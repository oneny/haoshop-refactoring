import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductData, ProductState } from 'types/product';

const initialState: ProductState = {
  products: [],
  product: {},
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<ProductData[]>) => {
      state.products = [...action.payload];
    }
  }
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;