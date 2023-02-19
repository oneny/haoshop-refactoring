import { useQueryClient } from '@tanstack/react-query';
import { getLookbooks } from 'api/lookbook';
import { queryKeys } from 'constants/queryKeys';
import { ReactNode, useEffect } from 'react';

export const Prefetch = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchInfiniteQuery({
      queryKey: [queryKeys.lookbooks],
      queryFn: ({ pageParam = 1 }) => getLookbooks(pageParam),
    });
  }, []);

  return <>{children}</>;
};
