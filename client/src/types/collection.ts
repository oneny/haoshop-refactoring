export interface CollectionData {
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
  id: string;
}
