import useScrollFetch from "@_hooks/useScrollFetch";
import { useMachoAccount } from "@_providers/Machoverse/Account";
import { Transaction } from "@_types/machoverse";
import { PageFetcher } from "@_types/marketplace";
import Web3API from "custom-objects/Fetch/API";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

const useTransactions = () => {
  const { userName } = useMachoAccount();
  const params = useSearchParams();
  const { data, setScrollEvent, loading } = useScrollFetch<
    [ReadonlyURLSearchParams | null],
    Transaction[]
  >(transactionFetch, true, 1, `transactions-${userName}`, [params]);

  return { transactions: data, setScrollEvent, loading };
};

export default useTransactions;

const transactionFetch: PageFetcher<
  [ReadonlyURLSearchParams | null],
  Transaction[]
> = async (pageInfo, dependencies) => {
  let filterPending = undefined;
  let filterConfirmed = undefined;
  if (dependencies) {
    filterPending = dependencies[0]?.get("filterPending") || undefined;
    filterConfirmed = dependencies[0]?.get("filterConfirmed") || undefined;
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
