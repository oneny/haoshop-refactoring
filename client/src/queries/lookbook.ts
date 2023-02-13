import { getLookbooks } from 'api/lookbook';
import { useInfiniteQuery } from '@tanstack/react-query';
import { queryKeys } from 'constants/queryKeys';

export const useLookbooksInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: [queryKeys.lookbook],
    queryFn: ({ pageParam = 1 }) => getLookbooks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.lookbooks.length ? allPages.length + 1 : undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
