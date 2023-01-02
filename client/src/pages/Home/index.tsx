import { MastHead } from 'components';
import { useAuth } from 'hooks';
import { useGetCategoriesQuery } from 'store/apis/categoryApiSlice';
import { useGetProductsQuery } from 'store/apis/productApiSlice';

export const Home = () => {
  const { data } = useGetProductsQuery({ currentPage: 1, perPage: 20, sort: 'latest' });
  console.log(data);

  return (
    <main>
      <MastHead />
    </main>
  );
};
