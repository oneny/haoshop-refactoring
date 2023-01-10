declare module 'store-interfaces' {
  export interface Auth {
    accessToken: string;
  }

  export interface AuthState {
    token: string | null;
  }

  export interface Brand {
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
    brands: Brand[];
    brand: BrandState | {};
  }

  export interface Category {
    _id: string;
    name: string;
    slug: string;
    viewType: string;
    children: Category[];
  }

  export interface CategoryState {
    categories: Category[];
    linearCategory: Category[];
  }

  export interface Collection {
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

  export interface CollectionState {
    collections: Collection[];
    collection: Collection | {};
  }

  export interface Product {
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

  export interface ProductState {
    products: Product[];
    product: Product | {};
  }

  export interface Lookbook {
    _id: string;
    name: string;
    description: string;
    modelInfo: string;
    wearingSize: string;
    banners: { _id: string; img: string }[];
    products: Pick<
      Product,
      '_id' | 'brand' | 'color' | 'discountPrice' | 'name' | 'productImgs'
    >[];
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    id: string;
  }

  export interface LookbookState {
    lookbooks: Lookbook[];
    lookbook: Lookbook | {};
  }
}

declare module 'params-type' {
  export interface Pagination {
    perPage: number;
    currentPage: number;
  }

  export interface ProductParams extends Pagination {
    cids: string[];
    brands: string[];
    sort: 'latest' | 'ascending' | 'descending' | 'salesRate' | 'ratings';
  }
}
