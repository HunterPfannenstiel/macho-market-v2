import useScrollFetch from "@_hooks/useScrollFetch";
import useSearchDebounce from "./useSearchDebounce";
import { PageFetcher } from "@_types/marketplace";

type SearchDelegate<T> = PageFetcher<string[], T>;

const useScrollSearch = <T extends Array<any>>(
  searchDelegate: SearchDelegate<T>,
  pageSize: number,
  key: string
) => {
  const [searchTerm, setSearchTerm] = useSearchDebounce();
  const { data, loading, setScrollEvent } = useScrollFetch<string[], T>(
    searchDelegate,
    false,
    pageSize,
    key,
    [searchTerm]
  );

  return { data, loading, setScrollEvent, setSearchTerm };
};

export default useScrollSearch;
