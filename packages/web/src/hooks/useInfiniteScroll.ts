import * as React from 'react';
import { PageInfo } from 'graphql/types';
import { useInView, InViewHookResponse } from 'react-intersection-observer';

interface UseInfiniteScroll {
  ref: Pick<InViewHookResponse, '0'>;
  hasFetchedMore: boolean;
}

interface UseInfiniteScrollProps {
  isFetching: boolean;
  loadMore: (nextPage: number) => void;
  pageInfo: PageInfo | undefined;
}

export function useInfiniteScroll({
  isFetching,
  loadMore,
  pageInfo
}: UseInfiniteScrollProps) {
  const [ref, isIntersecting] = useInView({ rootMargin: '160px' });
  const wasIntersecting = usePrevious<boolean>(isIntersecting);
  const [hasFetchedMore, setHasFetchedMore] = React.useState(false);

  const shouldLoadMore =
    !wasIntersecting && isIntersecting && !isFetching && pageInfo?.hasNextPage;

  React.useEffect(() => {
    if (shouldLoadMore && pageInfo) {
      loadMore(pageInfo.page + 1);
      setHasFetchedMore(true);
    }
  }, [shouldLoadMore, loadMore, pageInfo]);

  return { ref, hasFetchedMore };
}

function usePrevious<T>(value: T) {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
