export interface BrandData {
  _id: string;
  name: string;
  description: string;
  banner: { img: string; _id: string }[];
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: string;
  id: string;
}

export interface BrandState {
  brands: BrandData[];
  brand: BrandState | {};
}