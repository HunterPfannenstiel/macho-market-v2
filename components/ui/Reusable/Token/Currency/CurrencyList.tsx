import { FunctionComponent, useState } from "react";
import classes from "./CurrencyList.module.css";
import { Currency as CurrencyT } from "@_types/marketplace";
import Currency from ".";
import Tooltip from "../../ToolTip";

interface CurrencyListProps {
  currencies: CurrencyT[];
  selectedHandler?: (currencyId: number) => void;
  initialSelectedCurrency?: number;
}

const CurrencyList: FunctionComponent<CurrencyListProps> = ({
  currencies,
  selectedHandler,
  initialSelectedCurrency = -1,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState(
    initialSelectedCurrency
  );
  const onSelectCurrency = (currencyId: number) => {
    selectedHandler && selectedHandler(currencyId);
    setSelectedCurrency(currencyId);
  };
  return (
    <ul className={classes.currency_list}>
      {currencies.map((currency) => {
        const selected = selectedCurrency === currency.currency_id;
        return (
          <li key={currency.address} className={classes.currency_li}>
            <Tooltip
              name={currency.ticker}
              open={selected}
              link={`https://goerli.etherscan.io/address/${currency.address}`}
              openDirection="Up"
            />
            <Currency
              image={currency.image}
              fillColor={currency.fill_color}
              borderColor={currency.border_color}
              onClick={onSelectCurrency.bind(null, currency.currency_id)}
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
