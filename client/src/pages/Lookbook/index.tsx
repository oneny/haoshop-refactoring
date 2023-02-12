import { LookbookView } from 'components';
import { useAppSelector } from 'hooks';
import { selectLookbookById } from 'store/slices/lookbookSlice';
import { useParams } from 'react-router-dom';

export const Lookbook = () => {
  const { lookbookId } = useParams() as { lookbookId: string };
  const lookbook = useAppSelector((state) =>
    selectLookbookById(state, lookbookId)
  );

  if (!lookbook) return <></>;

  return <LookbookView lookbook={lookbook} />;
};
