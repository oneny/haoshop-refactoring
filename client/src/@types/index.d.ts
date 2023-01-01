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
    banner: { img: string, _id: string }[],
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    '__v': string;
    id: string;
  };
  
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
  };

  export interface CollectionState {
    collections: Collection[];
    collection: Collection | {};
  };

  export interface Lookbook {
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
}
