import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateTokens, updateTokens } from "./utils";
import { TransactionInfo, UserToken } from "@_types/machoverse";
import useInventoryTokens from "./useInventoryTokens";
import { useMetaMask } from "@_providers/Metamask";

type MutationReturn = TransactionInfo | undefined;
export type SuccessDelegate = (data?: TransactionInfo) => void;

const useUpdateTokens = (
  dbToBlockDelegate: SuccessDelegate,
  blockToDBDelegate: () => void
) => {
  const { provider } = useMetaMask();
  const { key, tokens, tokenLocation } = useInventoryTokens();
  const queryClient = useQueryClient();
  const { mutate } = useMutation<
    MutationReturn,
    string,
    UpdateTokens,
    UserToken[]
  >(updateTokens, {
    onMutate: async ({ tokens }) => {
      await queryClient.cancelQueries([key]);
      const previousTokens = queryClient.getQueryData([key]) as
        | UserToken[]
        | undefined;
      queryClient.setQueryData<UserToken[] | undefined>([key], (prevTokens) => {
        if (prevTokens) {
          const copyTokens = prevTokens.map((token) => {
            return { ...token };
          });
          tokens.forEach(({ tokenId, amount }) => {
            const token = copyTokens.find((token) => token.tokenId === tokenId);
            if (token) {
              token.amount -= amount;
            }
          });
          return copyTokens;
        } else {
          console.error("Tried to mutate without any data");
        }
      });
      return previousTokens;
    },
    onError: (error, _variables, context) => {
      if (!context) {
        console.error("Error it token decrement function");
      } else {
        console.error(error);
        console.log("Show error notification");
        queryClient.setQueryData([key], context);
      }
    },

    onSuccess: (data) => {
      if (tokenLocation === "game") {
        dbToBlockDelegate(data);
      } else {
        blockToDBDelegate();
      }
    },
  });

  const mutateTokens = (tokens: UserToken[]) => {
    mutate({ tokenLocation, tokens, provider });
  };

  return { removeFromTokenState: mutateTokens, tokens, tokenLocation };
};

export default useUpdateTokens;
