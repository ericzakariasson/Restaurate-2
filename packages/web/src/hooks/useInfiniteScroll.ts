import * as React from 'react';
import { useInView } from 'react-intersection-observer';

interface UseInfiniteScrollOptions {
  loadMore: () => void;
}

export function useInfiniteScroll(options: UseInfiniteScrollOptions) {
  const [ref, inView] = useInView({ rootMargin: '240px' });

  React.useEffect(() => {
    if (inView) {
      options.loadMore();
    }
  }, [inView, options]);

  return { ref };
}
