import { FunctionComponent } from "react";
import classes from "./InventoryToken.module.css";
import Token from "../Token";
import Image from "next/image";
import { MachoToken, UserToken } from "@_types/machoverse";

type InventoryTokenProps = {
  userToken: UserToken;
  token: MachoToken;
  isSelected: boolean;
  onClickHandler: (id: number) => void;
};

const InventoryToken: FunctionComponent<InventoryTokenProps> = ({
  userToken,
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
        onClickHandler(userToken.tokenId);
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
            sway={false}
          />
        )}
        {token.type === "item" && (
          <Image src={token.image} alt={token.name} fill />
        )}
      </div>
      <div className={classes.token_info}>
        <p>{token.name}</p>
        <p>{userToken.amount}</p>
      </div>
    </div>
  );
};

export default InventoryToken;
