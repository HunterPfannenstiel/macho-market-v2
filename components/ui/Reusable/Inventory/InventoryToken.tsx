import { FunctionComponent } from "react";
import classes from "./InventoryToken.module.css";
import Token from "../Token";
import Image from "next/image";
import { MachoToken } from "@_types/machoverse";

type InventoryTokenProps = { token: MachoToken } & {
  isSelected: boolean;
  onClickHandler: (id: number) => void;
};

const InventoryToken: FunctionComponent<InventoryTokenProps> = ({
  token,
  isSelected,
  onClickHandler,
}) => {
  const className = isSelected
    ? `${classes.token} ${classes.selected}`
    : classes.token;
  return (
    <div
      className={className}
      onClick={() => {
        onClickHandler(token.tokenId);
      }}
    >
      <div
        className={
          token.type === "item"
            ? classes.image_container
            : classes.coin_container
        }
      >
        {token.type === "coin" && (
          <Token
            image={token.image}
            diameter="100px"
            thickness="2px"
            borderColor={token.colors.borderColor}
            fillColor={token.colors.fillColor}
          />
        )}
        {token.type === "item" && (
          <Image src={token.image} alt={token.name} fill />
        )}
      </div>
      <div className={classes.token_info}>
        <p>{token.name}</p>
        <p>{token.amount}</p>
      </div>
    </div>
  );
};

export default InventoryToken;
