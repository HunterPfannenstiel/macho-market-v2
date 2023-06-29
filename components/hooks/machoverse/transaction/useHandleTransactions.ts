import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import useTransactions from "./useTransactions";
import {
  MutateTransaction,
  modifyReclaimedTransaction,
  modifyRemintedTransaction,
  reclaimTransaction,
  remintTransaction,
  updateTransaction,
} from "./utils";
import { Transaction } from "@_types/machoverse";
import { useMetaMask } from "@_providers/Metamask";

const useHandleTransactions = () => {
  const { provider } = useMetaMask();
  const { transactions, setScrollEvent, loading, queryKey } = useTransactions();
  const queryClient = useQueryClient();
  const { mutate } = useMutation<any, any, MutateTransaction>(
    updateTransaction,
    {
      onMutate: async ({ clientDelegate, pageNumber }) => {
        await queryClient.cancelQueries(queryKey);
        const previousTransactions = queryClient.getQueryData(queryKey) as
          | InfiniteData<Transaction[]>
          | undefined;
        queryClient.setQueryData<InfiniteData<Transaction[]>>(
          queryKey,
          (prevState) => {
            if (prevState) {
              const copyPages = prevState.pages.map((page) => [...page]);
              const copyTransactions = prevState.pages[pageNumber]?.map(
                (transaction) => {
                  return { ...transaction };
                }
              );
              clientDelegate(copyTransactions);
              copyPages[pageNumber] = copyTransactions;
              return { pageParams: prevState.pageParams, pages: copyPages };
            }
          }
        );
        return previousTransactions;
      },
      onError: (error, _variables, context) => {
        if (context) {
          console.error("Display transaction error", error);
          queryClient.setQueryData(queryKey, context);
        } else {
          console.log("Error should not have occurred");
          queryClient.setQueryData(queryKey, { pageParams: [], pages: [[]] });
        }
      },
      onSuccess: () => {
        console.log("success");
      },
    }
  );
  const mutateTransaction = (
    status: string,
    index: number,
    transactionId: number,
    pageNumber: number
  ) => {
    if (status === "Pending") {
      mutate({
        dbDelegate: remintTransaction(provider, transactionId),
        clientDelegate: modifyRemintedTransaction(index),
        pageNumber,
      });
    } else if (status === "Expired") {
      mutate({
        dbDelegate: reclaimTransaction(transactionId),
        clientDelegate: modifyReclaimedTransaction(index),
        pageNumber,
      });
    } else {
      console.error("No action to commit");
    }
  };
  return {
    transactions,
    setScrollEvent,
    loading,
    updateTransaction: mutateTransaction,
  };
};

export default useHandleTransactions;
