type CategoryProps = {
  _id: string;
  name: string;
  slug: string;
  viewType: string;
  children: CategoryProps[];
}

export const createLinearCategory = (categories: CategoryProps[], linearCategories: CategoryProps[] = []) => {
  for (const category of categories) {
    linearCategories.push(category);

    if (category.children.length > 0) {
      createLinearCategory(category.children, linearCategories);
    }
  }
  return linearCategories;
}