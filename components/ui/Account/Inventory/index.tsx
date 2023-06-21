import { FunctionComponent } from "react";
import classes from "./Inventory.module.css";
import { UserToken } from "@_types/machoverse";

interface InventoryProps {
  tokens: UserToken[];
}

const Inventory: FunctionComponent<InventoryProps> = ({ tokens }) => {
  console.log(tokens);
  return (
    <ul>
      {tokens.map((token) => {
        return <li>{token.amount}</li>;
      })}
    </ul>
  );
};

export default Inventory;
