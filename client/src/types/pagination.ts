export interface Pagination {
  perPage: number;
  currentPage: number;
}

export interface ProductParams extends Pagination {
  cids: string[];
  brands: string[];
  sort: 'latest' | 'ascending' | 'descending' | 'salesRate' | 'ratings';
}