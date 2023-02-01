import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionData, CollectionState } from 'types/collection';

const initialState: CollectionState = {
  collections: [],
  collection: {}
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<CollectionData[]>) => {
      state.collections = [...action.payload];
    }
  },
});

export const { setCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
