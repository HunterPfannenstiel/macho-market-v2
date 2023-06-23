import { MachoTokens } from "@_types/machoverse";
import { useQuery } from "@tanstack/react-query";

const useTokenMeatadata = () => {
  const { data, isLoading, isError } = useQuery(["macho-tokens"], {
    queryFn: fetcher,
    staleTime: Infinity,
  });

  return { metadata: data, isLoading, isError };
};

export default useTokenMeatadata;

const fetcher = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/token-metadata`
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error("Error retrieving token metadata", data);
  }
  return data as MachoTokens;
};
