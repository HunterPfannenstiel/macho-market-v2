import useScrollFetch from "@_hooks/useScrollFetch";
import { useMachoAccount } from "@_providers/Machoverse/Account";
import { Transaction } from "@_types/machoverse";
import { PageFetcher } from "@_types/marketplace";
import Web3API from "custom-objects/Fetch/API";
import { useSearchParams } from "next/navigation";

const useTransactions = () => {
  const { userName } = useMachoAccount();
  const params = useSearchParams();
  const { data, setScrollEvent, loading, queryKey } = useScrollFetch<
    (string | null | undefined)[],
    Transaction[]
  >(transactionFetch, true, 5, `transactions-${userName}`, [
    params?.get("filterPending"),
    params?.get("filterConfirmed"),
  ]);

  return { transactions: data, setScrollEvent, loading, queryKey };
};

export default useTransactions;

const transactionFetch: PageFetcher<
  (string | null | undefined)[],
  Transaction[]
> = async (pageInfo, dependencies) => {
  let filterPending = undefined;
  let filterConfirmed = undefined;
  if (dependencies) {
    filterPending = dependencies[0];
    filterConfirmed = dependencies[1];
  }
  return (
    (
      await Web3API.Get<Transaction[]>(
        `/database/web/transactions?date=${pageInfo.date}&page=${
          pageInfo.page
        }&pageSize=${pageInfo.pageSize}${
          filterPending !== undefined ? `&filterPending=${filterPending}` : ""
        }${
          filterConfirmed !== undefined
            ? `&filterConfirmed=${filterConfirmed}`
            : ""
        }`
      )
    ).data || []
  );
};
