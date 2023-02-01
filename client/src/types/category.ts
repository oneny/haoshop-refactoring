export interface CategoryData {
  _id: string;
  name: string;
  slug: string;
  viewType: string;
  children: CategoryData[];
}

export interface CategoryState {
  categories: CategoryData[];
  linearCategory: CategoryData[];
}