import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getLookbooks } from 'api/lookbook';
import { LookbooksView } from 'components';
import { queryKeys } from 'constants/queryKeys';
import { useLookbooksInfiniteQuery } from 'queries/lookbook';
import { useCallback, useRef } from 'react';
import { TLookbookViewProps } from 'types/lookbook';

export default function Lookbooks() {
  const { fetchNextPage, hasNextPage, data: lookbooks } = useLookbooksInfiniteQuery();

  const intObserver = useRef<IntersectionObserver | null>(null);
  const lastLookbookRef = useCallback(
    (lookbook: HTMLLIElement) => {
      if (!hasNextPage) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (lookbook) intObserver.current.observe(lookbook);
    },
    [fetchNextPage, hasNextPage],
  );

  const lookbooksViewProsp: TLookbookViewProps = {
    lookbooks,
    lastLookbookRef,
  };

  return <>{lookbooks && <LookbooksView {...lookbooksViewProsp} />}</>;
}

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: [queryKeys.lookbooks],
    queryFn: ({ pageParam = 1 }) => getLookbooks(pageParam),
  });

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}
