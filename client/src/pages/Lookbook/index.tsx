import { useParams } from 'react-router-dom';

export const Lookbook = () => {
  const { lookbookId } = useParams();

  return (
    <div>{lookbookId}</div>
  )
}
