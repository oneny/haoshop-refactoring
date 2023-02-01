import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection, CollectionState } from '@types';

const initialState: CollectionState = {
  collections: [],
  collection: {}
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<Collection[]>) => {
      state.collections = [...action.payload];
    }
  },
});

export const { setCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
