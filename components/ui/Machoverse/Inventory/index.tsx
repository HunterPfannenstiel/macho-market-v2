"use client";

import { FunctionComponent } from "react";
import classes from "./Inventory.module.css";
import { MachoToken } from "@_types/machoverse";
import InventoryTokenList from "components/ui/Reusable/Inventory/InventoryTokenList";

interface InventoryProps {
  tokens: MachoToken[];
}

const Inventory: FunctionComponent<InventoryProps> = ({ tokens }) => {
  const onTokenClicked = (id: number) => {
    console.log(id);
  };
  return <InventoryTokenList tokens={tokens} onTokenClicked={onTokenClicked} />;
};

export default Inventory;
