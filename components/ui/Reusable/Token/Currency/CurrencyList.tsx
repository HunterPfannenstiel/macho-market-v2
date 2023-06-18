import { FunctionComponent, useState } from "react";
import classes from "./CurrencyList.module.css";
import { Currency as CurrencyT } from "@_types/marketplace";
import Currency from ".";
import Tooltip from "../../ToolTip";

interface CurrencyListProps {
  currencies: CurrencyT[];
}

const CurrencyList: FunctionComponent<CurrencyListProps> = ({ currencies }) => {
  const [selectedCurrency, setSelectedCurrency] = useState("");
  return (
    <ul className={classes.currency_list}>
      {currencies.map((currency) => {
        const selected = selectedCurrency === currency.address;
        return (
          <li key={currency.address} className={classes.currency_li}>
            <Tooltip
              name={currency.ticker}
              open={selected}
              link={`https://goerli.etherscan.io/address/${currency.address}`}
              openDirection="Left"
            />
            <Currency
              image={currency.image}
              fillColor={currency.fill_color}
              borderColor={currency.border_color}
              onClick={setSelectedCurrency.bind(null, currency.address)}
              selected={selected}
              blur={!!selectedCurrency && !selected}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default CurrencyList;
