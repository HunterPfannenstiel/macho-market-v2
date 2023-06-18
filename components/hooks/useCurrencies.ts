import { Currency } from "@_types/marketplace";
import { useQuery } from "@tanstack/react-query";

const useCurrencies = () => {
  const { data } = useQuery(["currencies"], {
    queryFn: getCurrencies,
    initialData: [],
  });

  return data;
};

export default useCurrencies;

const getCurrencies = async () => {
  const res = await fetch("/api/currencies");
  const data = await res.json();
  if (!res.ok) throw new Error(data.message);
  return data as Currency[];
};
