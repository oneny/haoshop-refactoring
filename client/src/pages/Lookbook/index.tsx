import { useAppSelector } from 'hooks';
import { useRequiredParams } from 'hooks/useRequiredParams';
import { useParams } from 'react-router-dom';
import { selectLookbookById } from 'store/slices/lookbookSlice';

export const Lookbook = () => {
  const { lookbookId } = useRequiredParams(['lookbookId']);
  const lookbook = useAppSelector((state) => selectLookbookById(state, lookbookId));
  
  return (
    <div>{lookbookId}</div>
  )
}
