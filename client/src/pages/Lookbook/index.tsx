import { LookbookView } from 'components';
import { useAppSelector } from 'hooks';
import { useRequiredParams } from 'hooks/useRequiredParams';
import { selectLookbookById } from 'store/slices/lookbookSlice';



export const Lookbook = () => {
  const { lookbookId } = useRequiredParams(['lookbookId']);
  const lookbook = useAppSelector((state) =>
    selectLookbookById(state, lookbookId),
  );

  if (!lookbook) return <></>;

  return <LookbookView lookbook={lookbook} />;
};
