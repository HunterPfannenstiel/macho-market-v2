"use client";

import { FunctionComponent } from "react";
import classes from "./LinkWallet.module.css";
import { authenticateWallet } from "@_utils/web3/auth";

interface LinkWalletProps {}

const LinkWallet: FunctionComponent<LinkWalletProps> = () => {
  const onLink = async () => {
    const res = await authenticateWallet(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/wallet-link`
    );
  };
  return <button onClick={onLink}>Link</button>;
};

export default LinkWallet;
