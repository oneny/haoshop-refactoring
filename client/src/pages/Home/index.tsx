import { MastHead } from 'components';
import { useAuth } from 'hooks';
import { useGetBrandsQuery } from 'store/apis/brandAPiSlice';
import { useGetCollectionsQuery } from 'store/apis/collectionApiSlice';

export const Home = () => {
  console.log(useAuth());
  // const { data } = useGetBrandsQuery();
  // console.log(data);
  const { data } = useGetCollectionsQuery({ perPage: 20, currentPage: 1 });
  console.log(data);
  return (
    <main>
      <MastHead />
    </main>
  );
};
