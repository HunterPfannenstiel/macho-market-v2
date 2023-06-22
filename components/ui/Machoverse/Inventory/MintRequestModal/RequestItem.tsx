import { FunctionComponent } from "react";
import classes from "./RequestItem.module.css";
import Image from "next/image";
import NumberInput from "components/ui/Reusable/Form/Inputs/NumberInput";
import { MachoToken } from "@_types/machoverse";

interface RequestItemProps {
  token: MachoToken;
  onValueChange: (id: number, value: number) => void;
}

const RequestItem: FunctionComponent<RequestItemProps> = ({
  token,
  onValueChange,
}) => {
  const onChange = (value: number) => {
    onValueChange(token.tokenId, value);
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
        <NumberInput
          onChange={onChange}
          className={classes.num_input}
          max={token.amount}
        />
        <span>/</span>
        <p>{token.amount}</p>
      </div>
    </div>
  );
};

export default RequestItem;
