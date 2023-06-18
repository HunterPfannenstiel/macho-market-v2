import { LogEntry, PageFetcher } from "@_types/marketplace";
import useScrollFetch from "./useScrollFetch";
import { InfiniteData } from "@tanstack/react-query";

const useGlobalActivity = () => {
  const { data, setScrollEvent, status } = useScrollFetch<[], LogEntry[]>(
    fetcher,
    true,
    10,
    "global-activity"
  );

  return [data, setScrollEvent] as [
    InfiniteData<LogEntry[]> | undefined,
    (elem: HTMLElement | null) => void
  ];
};

export default useGlobalActivity;

const fetcher: PageFetcher<[], LogEntry[]> = async (page, date) => {
  const res = await fetch(
    `/api/activity?date=${date}&page=${page}&pageSize=${10}`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data;
};
