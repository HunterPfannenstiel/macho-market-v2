import { FunctionComponent } from "react";
import classes from "./RequestItem.module.css";
import Image from "next/image";
import NumberInput from "components/ui/Reusable/Form/Inputs/NumberInput";
import { MachoToken, UserToken } from "@_types/machoverse";

interface RequestItemProps {
  userToken: UserToken;
  token: MachoToken;
  onValueChange?: (id: number, value: number) => void;
  showNumberInput?: boolean;
}

const RequestItem: FunctionComponent<RequestItemProps> = ({
  userToken,
  token,
  onValueChange,
  showNumberInput = true,
}) => {
  const onChange = (value: number) => {
    onValueChange && onValueChange(userToken.tokenId, value);
  };
  const classN =
    token.type === "coin"
      ? `${classes.image_container} ${classes.coin}`
      : classes.image_container;
  return (
    <div className={classes.item}>
      <div className={classN}>
        <Image src={token.image} alt={token.name} fill />
      </div>
      <p className={classes.name}>{token.name}</p>
      <div className={classes.input}>
        {showNumberInput && (
          <>
            <NumberInput
              onChange={onChange}
              className={classes.num_input}
              max={userToken.amount}
            />
            <span>/</span>
          </>
        )}
        <p>{userToken.amount}</p>
      </div>
    </div>
  );
};

export default RequestItem;
