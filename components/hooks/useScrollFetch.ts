import { PageFetcher } from "@_types/marketplace";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
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
  const date = useRef(new Date().toUTCString());
  const endOfContent = useRef(false);
  const fetching = useRef(isInitialFetcher);
  const scrollHandler = useRef<any>(null);
  const scrollElement = useRef<HTMLElement>();
  const queryKey = [key, [...fetchDependency]];
  const queryFn = async ({ pageParam = 0 }) => {
    fetching.current = true;
    const res = await fetchFunction(
      { date: date.current, page: pageParam, pageSize },
      fetchDependency
    );
    if (res.length < pageSize) endOfContent.current = true;
    fetching.current = false;
    return res;
  };
  const { data, fetchNextPage, isFetching, status, hasNextPage } =
    useInfiniteQuery<U>({
      queryKey,
      queryFn,
      getNextPageParam: (_lastPage, pages) => {
        if (pages[pages.length - 1].length < pageSize) {
          endOfContent.current = true;
          return undefined;
        } else {
          return pages.length;
        }
      },
      refetchOnWindowFocus: false,
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
    console.log("Dep change");
    endOfContent.current = false;
    page.current = 0;
    date.current = new Date().toUTCString();
  }, [...fetchDependency]);

  return { data, loading: isFetching, setScrollEvent, status, queryKey };
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
