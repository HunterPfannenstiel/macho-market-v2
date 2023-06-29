import { Fragment, FunctionComponent } from "react";
import classes from "./TransactionItemList.module.css";
import TransactionItem from ".";
import ScrollComponent from "@_reuseable/ScrollComponent";
import useTransactions from "@_hooks/machoverse/transaction/useTransactions";
import useHandleTransactions from "@_hooks/machoverse/transaction/useHandleTransactions";

interface TransactionItemListProps {
  // transactions: Transaction[];
}

const TransactionItemList: FunctionComponent<
  TransactionItemListProps
> = ({}) => {
  const { transactions, setScrollEvent, loading, updateTransaction } =
    useHandleTransactions();
  console.log({ transactions, loading });
  const onUpdateTransaction =
    (index: number, pageNumber: number) =>
    (status: string, transactionId: number) => {
      updateTransaction(status, index, transactionId, pageNumber);
    };
  if (!transactions) return <p>Loading...</p>;
  return (
    <ScrollComponent
      isFetching={loading}
      setScroll={setScrollEvent}
      className={classes.transaction_list}
    >
      {transactions.pages.map((page, i) => {
        return (
          <Fragment key={i}>
            {page.map((transaction, j) => {
              return (
                <TransactionItem
                  transaction={transaction}
                  key={transaction.transaction_id}
                  onClick={onUpdateTransaction(j, i)}
                />
              );
            })}
          </Fragment>
        );
      })}
    </ScrollComponent>
  );
};

export default TransactionItemList;
