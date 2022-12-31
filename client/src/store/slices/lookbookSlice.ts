import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type LookbookProps = {
  _id: string;
  name: string;
  description: string;
  modelInfo: string;
  wearingSize: string;
  banners: { _id: string; img: string }[];
  products: string[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
};

type LookbookStateProps = {
  lookbooks: LookbookProps[];
  lookbook: LookbookProps | {};
};

const initialState: LookbookStateProps = {
  lookbooks: [],
  lookbook: {},
};

const lookbookSlice = createSlice({
  name: 'lookbook',
  initialState,
  reducers: {
    setLookbooks: (state, action: PayloadAction<LookbookProps[]>) => {
      state.lookbooks = [...action.payload];
    }
  }
});

export const { setLookbooks } = lookbookSlice.actions;

export default lookbookSlice.reducer;