import { UserToken } from "@_types/machoverse";
import { useQuery } from "@tanstack/react-query";
import Web3API from "custom-objects/Fetch/API";
import { useSearchParams } from "next/navigation";

const useInventoryTokens = () => {
  const params = useSearchParams();
  const tokenLocation = params?.get("inventory") || "game";
  const key = `macho-tokens-${tokenLocation}`;
  const { data } = useQuery([key], {
    queryFn: fetchTokens.bind(null, tokenLocation),
    staleTime: Infinity,
  });
  return { key, tokenLocation, tokens: data };
};

export default useInventoryTokens;

const fetchTokens = async (queryParam?: string | null) => {
  let url = queryParam
    ? `/database/user-tokens?inventory=${queryParam}`
    : "/database/user-tokens";
  const { data, errorMessage, success } = await Web3API.Get<UserToken[]>(url);
  if (!success) {
    throw new Error(errorMessage);
  }
  return data;
};
