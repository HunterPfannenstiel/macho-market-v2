import { PageFetcher } from "@_types/marketplace";
import { useInfiniteQuery } from "@tanstack/react-query";
import { MutableRefObject, useEffect, useRef } from "react";

const useScrollFetch = <T extends Array<any>, U extends Array<any>>(
  fetchFunction: PageFetcher<T, U>,
  isInitialFetcher: boolean,
  pageSize: number,
  key: string,
  fetchDependency: T = [] as unknown as T,
  initialPageNumber = 0,
  percentTillFetch = 50
) => {
  const page = useRef(initialPageNumber);
  const date = useRef(new Date().toISOString());
  const endOfContent = useRef(false);
  const fetching = useRef(isInitialFetcher);
  const scrollHandler = useRef<any>(null);
  const scrollElement = useRef<HTMLElement>();
  const queryFn = (date: string) => async () => {
    fetching.current = true;
    const res = await fetchFunction(page.current, date, fetchDependency);
    console.log({ page: page.current, res });
    if (res.length < pageSize) endOfContent.current = true;
    else page.current++;
    fetching.current = false;
    return res;
  };
  const { data, fetchNextPage, isFetching, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [key, fetchDependency],
      queryFn: queryFn(date.current),
      getNextPageParam: () => page.current,
    });

  const setScrollEvent = (elem: HTMLElement | null) => {
    if (elem) {
      scrollElement.current = elem;
      scrollHandler.current = getScrollHandler(
        elem,
        percentTillFetch,
        fetching,
        fetchNextPage,
        endOfContent
      );
      scrollElement.current.addEventListener("scroll", scrollHandler.current);
    } else if (!elem && !!scrollElement.current) {
      scrollElement.current.removeEventListener(
        "scroll",
        scrollHandler.current
      );
      scrollElement.current = undefined;
      scrollHandler.current = null;
    }
  };

  useEffect(() => {
    endOfContent.current = false;
    page.current = 0;
  }, [...fetchDependency]);

  return { data, loading: isFetching, setScrollEvent, status };
};

export default useScrollFetch;

const getScrollHandler = (
  e: HTMLElement,
  percentTillFetch: number,
  isFetching: MutableRefObject<boolean>,
  pageFetcher: () => void,
  endOfContent: MutableRefObject<boolean>
) => {
  const containerHeight = e.clientHeight;
  const scrollEvent = () => {
    if (!endOfContent.current) {
      const bottomDistance = e.scrollHeight - e.scrollTop - containerHeight;
      if ((bottomDistance / containerHeight) * 100 <= percentTillFetch) {
        if (!isFetching.current) {
          pageFetcher();
        }
      }
    }
  };
  return scrollEvent;
};
