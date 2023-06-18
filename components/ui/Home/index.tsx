"use client";

import { FunctionComponent } from "react";
import classes from "./Home.module.css";
import useCurrencies from "@_hooks/useCurrencies";
import Activity from "./Activity";
import CurrencyList from "../Reusable/Token/Currency/CurrencyList";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const currencies = useCurrencies();

  if (currencies.length === 0) return <p>Loading</p>;
  return (
    <>
      <CurrencyList currencies={currencies} />
      {/* <Activity /> */}
    </>
  );
};

export default Home;
