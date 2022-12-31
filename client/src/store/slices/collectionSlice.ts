import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type CollectionProps = {
  _id: string;
  name: string;
  description: string;
  brand: string;
  launched: string;
  director: string;
  country: string;
  shop: string;
  banners: { _id: string; img: string }[];
  cards: { _id: string; img: string }[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

type CollectionStateProps = {
  collections: CollectionProps[];
  collection: CollectionProps | {};
};

const initialState: CollectionStateProps = {
  collections: [],
  collection: {}
};

const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    setCollections: (state, action: PayloadAction<CollectionProps[]>) => {
      state.collections = [...action.payload];
    }
  },
});

export const { setCollections } = collectionSlice.actions;

export default collectionSlice.reducer;
