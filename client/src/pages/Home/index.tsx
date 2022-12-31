import { MastHead } from 'components';
import { useAuth } from 'hooks';
import { useGetBrandsQuery } from 'store/apis/brandAPiSlice';

export const Home = () => {
  console.log(useAuth());
  // const { data } = useGetBrandsQuery();
  // console.log(data);
  return (
    <main>
      <MastHead />
    </main>
  );
};
