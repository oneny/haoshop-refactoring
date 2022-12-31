import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './apis/apiSlice';
import authSlice from './slices/authSlice';
import brandSlice from './slices/brandSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    brand: brandSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;