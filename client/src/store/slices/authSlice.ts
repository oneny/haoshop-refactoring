import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthData, AuthState } from 'types/auth';
import type { RootState } from 'store';

const initialState: AuthState = {
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<AuthData>) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    clearCredentials: (state) => {
      state.token = null;
    }
  }
})

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
