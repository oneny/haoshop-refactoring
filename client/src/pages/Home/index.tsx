import { MastHead } from 'components';
import { useAuth } from 'hooks';
import { useGetCategoriesQuery } from 'store/apis/categoryApiSlice';

export const Home = () => {
  console.log(useAuth());
  const { data } = useGetCategoriesQuery();
  console.log(data);

  return (
    <main>
      <MastHead />
    </main>
  );
};
