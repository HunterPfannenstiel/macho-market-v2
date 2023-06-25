import { FunctionComponent } from "react";
import classes from "./TransactionItemList.module.css";
import { Transaction } from "@_types/machoverse";
import TransactionItem from ".";
import useScrollFetch from "@_hooks/useScrollFetch";
import Web3API from "custom-objects/Web3API";
import { PageFetcher } from "@_types/marketplace";
import { useMachoAccount } from "@_providers/Machoverse/Account";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

interface TransactionItemListProps {
  transactions: Transaction[];
}

const TransactionItemList: FunctionComponent<TransactionItemListProps> = ({
  transactions,
}) => {
  const { userName } = useMachoAccount();
  const params = useSearchParams();
  const { setScrollEvent, data } = useScrollFetch<
    [ReadonlyURLSearchParams | null],
    Transaction[]
  >(transactionFetch, true, 1, `transactions-${userName}`, [params]);
  if (!data) return <p>Loading...</p>;
  return (
    <ul className={classes.transaction_list} ref={setScrollEvent}>
      {data.pages.map((page) => {
        return (
          <>
            {page.map((transaction) => {
              return (
                <TransactionItem
                  transaction={transaction}
                  key={transaction.transaction_id}
                />
              );
            })}
          </>
        );
      })}
    </ul>
  );
};

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

export default TransactionItemList;
