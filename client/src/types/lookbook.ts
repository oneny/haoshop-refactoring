import { ProductData } from './product';

export interface LookbookData {
  _id: string;
  name: string;
  description: string;
  modelInfo: string;
  wearingSize: string;
  banners: { _id: string; img: string }[];
  products: Pick<
    ProductData,
    '_id' | 'brand' | 'color' | 'discountPrice' | 'name' | 'productImgs'
  >[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface LookbookState {
  lookbooks: LookbookData[];
  lookbook: LookbookData | {};
}
