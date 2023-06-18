"use client";

import { FunctionComponent } from "react";
import classes from "./Home.module.css";
import useCurrencies from "@_hooks/useCurrencies";
import Activity from "./Activity";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const currencies = useCurrencies();

  if (currencies.length === 0) return <p>Loading</p>;
  return (
    <>
      {currencies.map((currency) => {
        return <p style={{ color: currency.color }}>{currency.ticker}</p>;
      })}
      <Activity />
    </>
  );
};

export default Home;
