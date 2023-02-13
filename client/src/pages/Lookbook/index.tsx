import { LookbookView } from 'components';
import { useLookbookQuery } from 'queries/lookbook';
import { useParams } from 'react-router-dom';

export const Lookbook = () => {
  const { lookbookId } = useParams() as { lookbookId: string };
  const { data: lookbook } = useLookbookQuery(lookbookId);

  return <LookbookView lookbook={lookbook} />;
};
