"use client";

import { FunctionComponent } from "react";
import classes from "./Home.module.css";
import useCurrencies from "@_hooks/useCurrencies";
import Activity from "./Activity";
import CurrencyList from "../Reusable/Token/Currency/CurrencyList";
import FaucetModal from "../FaucetModal";
import { useMetaMask } from "@_providers/Metamask";
import { connectMetaMask } from "@_hooks/web3/useAccount";
import { chainIdToName } from "@_providers/Metamask/utils";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const { account, chainId } = useMetaMask();
  return (
    <>
      {/* <CurrencyList currencies={currencies} /> */}
      <FaucetModal />
      {account && <p>{account}</p>}
      {!account && <button onClick={connectMetaMask}>Connect</button>}
      {chainId && <p>{chainIdToName[chainId] || chainId}</p>}
      {/* <Activity /> */}
    </>
  );
};

export default Home;
