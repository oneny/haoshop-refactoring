import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apis/apiSlice';
import authSlice from './slices/authSlice';
import brandSlice from './slices/brandSlice';
import categorySlice from './slices/categorySlice';
import collectionSlice from './slices/collectionSlice';
import lookbookSlice from './slices/lookbookSlice';
import productSlice from './slices/productSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    brand: brandSlice,
    collection: collectionSlice,
    lookbook: lookbookSlice,
    category: categorySlice,
    product: productSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;