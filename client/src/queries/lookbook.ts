import { getLookbook, getLookbooks } from 'api/lookbook';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'constants/queryKeys';

export const useLookbooksInfiniteQuery = () => {
  return useInfiniteQuery({
    queryKey: [queryKeys.lookbooks],
    queryFn: ({ pageParam = 1 }) => getLookbooks(pageParam),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.lookbooks?.length ? allPages.length + 1 : undefined;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export const useLookbookQuery = (id: string) => {
  return useQuery({
    queryKey: [queryKeys.lookbook, id],
    queryFn: () => getLookbook(id),
  });
};
