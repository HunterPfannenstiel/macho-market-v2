import { Collection } from "@_types/marketplace";
import { useQuery } from "@tanstack/react-query";

const useCollections = () => {
  const { data } = useQuery(["collections"], {
    queryFn: getCollections,
    initialData: [],
  });
  return data;
};

export default useCollections;

const getCollections = async () => {
  const res = await fetch(
    `/api/collections?date=${new Date().toISOString()}&page=0&pageSize=10`
  );
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data as Collection[];
};
