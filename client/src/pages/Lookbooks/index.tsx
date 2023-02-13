import { LookbooksView } from 'components';
import { useLookbooksInfiniteQuery } from 'queries/lookbook';
import { useCallback, useRef } from 'react';
import { TLookbookViewProps } from 'types/lookbook';

export const Lookbooks = () => {
  const {
    fetchNextPage,
    hasNextPage,
    data: lookbooks,
  } = useLookbooksInfiniteQuery();

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

  return <LookbooksView {...lookbooksViewProsp} />;
};
