import { MastHead } from 'components';
import { useAuth } from 'hooks';
import { useGetCategoriesQuery } from 'store/apis/categoryApiSlice';

export const Home = () => {

  return (
    <main>
      <MastHead />
    </main>
  );
};
