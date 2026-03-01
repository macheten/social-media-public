import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  fetching: boolean;
  hasNextPage: boolean;
  loadMore: () => Promise<void>;
}

export const useInfiniteScroll = ({
  fetching,
  hasNextPage,
  loadMore,
}: InfiniteScrollProps) => {
  const endOfPage = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (fetching || !hasNextPage) return;
    if (observer.current) observer.current.disconnect();

    const callback: IntersectionObserverCallback = async (entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        await loadMore();
      }
    };
    observer.current = new IntersectionObserver(callback, {
      root: null,
      rootMargin: "100px",
      threshold: 0,
    });
    observer.current.observe(endOfPage.current!);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetching, hasNextPage, loadMore]);

  return {
    endOfPage,
  };
};
