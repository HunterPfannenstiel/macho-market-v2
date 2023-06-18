import { FunctionComponent } from "react";
import classes from "./index.module.css";
import Token from "../index";

interface CurrencyProps {
  image: string;
  fillColor: string;
  borderColor: string;
  onClick?: () => void;
  selected: boolean;
  blur: boolean;
}

const Currency: FunctionComponent<CurrencyProps> = ({
  image,
  fillColor,
  borderColor,
  onClick,
  selected,
  blur,
}) => {
  return (
    <Token
      image={image}
      fillColor={fillColor}
      borderColor={borderColor}
      diameter="42px"
      thickness="2px"
      onClick={onClick}
      selected={selected}
      blur={blur}
    />
  );
};

export default Currency;
