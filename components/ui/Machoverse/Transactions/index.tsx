"use client";

import { FunctionComponent } from "react";
import classes from "./Transactions.module.css";
import TransactionItemList from "./TransactionItem/TransactionItemList";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import { Transaction } from "@_types/machoverse";

interface TransactionsProps {
  transactions: Transaction[];
}

const Transactions: FunctionComponent<TransactionsProps> = ({
  transactions,
}) => {
  return <TransactionItemList transactions={transactions} />;
};

export default Transactions;