import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { Lookbook, LookbookState } from 'store-interfaces';

const initialState: LookbookState = {
  lookbooks: [],
  lookbook: {},
};

const lookbookSlice = createSlice({
  name: 'lookbook',
  initialState,
  reducers: {
    setLookbooks: (state, action: PayloadAction<Lookbook[]>) => {
      state.lookbooks = [...action.payload];
    }
  }
});

export const { setLookbooks } = lookbookSlice.actions;

export default lookbookSlice.reducer;

export const selectAllLookbooks = (state: RootState) => state.lookbook.lookbooks;

export const selectLookbookById = (state: RootState, lookbookId: string) =>
  state.lookbook.lookbooks.find(({ id }) => id === lookbookId);