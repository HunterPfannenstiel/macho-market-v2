import { FunctionComponent } from "react";
import classes from "./TransactionItemList.module.css";
import { Transaction } from "@_types/machoverse";
import TransactionItem from ".";

interface TransactionItemListProps {
  transactions: Transaction[];
}

const TransactionItemList: FunctionComponent<TransactionItemListProps> = ({
  transactions,
}) => {
  return (
    <ul className={classes.transaction_list}>
      {transactions.map((transaction) => {
        return (
          <TransactionItem
            key={transaction.transaction_id}
            transaction={transaction}
          />
        );
      })}
    </ul>
  );
};

export default TransactionItemList;
