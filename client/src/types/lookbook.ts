import { InfiniteData } from '@tanstack/react-query';
import { ProductData } from './product';

export type LookbookData = {
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
};

export type TLookbooksDataRes = {
  lookbooks: LookbookData[];
};

export type TLookbookDataRes = {
  lookbook: LookbookData;
}

export type TLookbookViewProps = {
  lookbooks?: InfiniteData<TLookbooksDataRes>;
  lastLookbookRef: (lookbook: HTMLLIElement) => void;
};

export type TLookbookProps = {
  lookbook?: LookbookData;
}

export type LookbookState = {
  lookbooks: LookbookData[];
  lookbook: LookbookData | {};
};

