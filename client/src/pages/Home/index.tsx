import { MastHead } from 'components';
import { useAuth } from 'hooks';
import { useGetBrandsQuery } from 'store/apis/brandAPiSlice';
import { useGetCollectionsQuery } from 'store/apis/collectionApiSlice';
import { useGetLookbooksQuery } from 'store/apis/lookbookApiSlice';

export const Home = () => {
  console.log(useAuth());

  return (
    <main>
      <MastHead />
    </main>
  );
};
