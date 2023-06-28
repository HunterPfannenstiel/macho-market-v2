import { FunctionComponent } from "react";
import classes from "./TransactionItemList.module.css";
import TransactionItem from ".";
import ScrollComponent from "@_reuseable/ScrollComponent";
import useTransactions from "@_hooks/machoverse/transaction/useTransactions";

interface TransactionItemListProps {
  // transactions: Transaction[];
}

const TransactionItemList: FunctionComponent<
  TransactionItemListProps
> = ({}) => {
  const { transactions, setScrollEvent, loading } = useTransactions();
  console.log({ transactions, loading });
  if (!transactions) return <p>Loading...</p>;
  return (
    <ScrollComponent
      isFetching={loading}
      setScroll={setScrollEvent}
      className={classes.transaction_list}
    >
      {transactions.pages.map((page) => {
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
    </ScrollComponent>
  );
};

export default TransactionItemList;
