import { LookbookView } from 'components';
import { useLookbookQuery } from 'queries/lookbook';
import { GetServerSideProps } from 'next';

export default function Lookbook({ id }: { id: string }) {
  const { data: lookbook } = useLookbookQuery(id);

  return <><LookbookView lookbook={lookbook} /></>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const { id } = query;

  return {
    props: {
      id,
    },
  };
};
