import { useQueryClient } from '@tanstack/react-query';
import { getLookbooks } from 'api/lookbook';
import { queryKeys } from 'constants/queryKeys';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export const Prefetch = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchInfiniteQuery({
      queryKey: [queryKeys.lookbooks],
      queryFn: ({ pageParam = 1 }) => getLookbooks(pageParam),
    });
  }, []);

  return <Outlet />;
};
