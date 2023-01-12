import { LookbooksView } from 'components';
import { useAppSelector } from 'hooks';
import { selectAllLookbooks } from 'store/slices/lookbookSlice';

export const Lookbooks = () => {
  const lookbooks = useAppSelector(selectAllLookbooks);

  if (!lookbooks.length) return <p>Loading...</p>;

  return <LookbooksView lookbooks={lookbooks} />;
};
