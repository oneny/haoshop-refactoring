export interface ProductData {
  ratings: {
    total: number;
    sum: number;
    avg: number;
  };
  _id: string;
  code: string;
  name: string;
  slug: string;
  brand: string;
  color: string;
  description: string;
  productImgs: { fileName: string; _id: string }[];
  price: number;
  discountPrice: number;
  stock: { size: string; qty: number; _id: string }[];
  category: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  grossSales: number;
  salesRate: number;
  id: string;
}
