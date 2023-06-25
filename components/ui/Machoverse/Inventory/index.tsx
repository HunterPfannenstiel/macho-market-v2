"use client";

import { FunctionComponent, useEffect } from "react";
import { UserToken } from "@_types/machoverse";

import DatabaseInventory from "./DatabaseInventory";
import useHandleTokens from "@_hooks/machoverse/useHandleTokens";
import { useMachoAccount } from "@_providers/Machoverse/Account";

interface InventoryProps {
  tokens: UserToken[];
}

const Inventory: FunctionComponent<InventoryProps> = ({ tokens }) => {
  const dbTokens = useHandleTokens();
  const { userName } = useMachoAccount();
  useEffect(() => {
    dbTokens.initializeTokens(tokens);
  }, [tokens]);
  return (
    <DatabaseInventory
      tokens={dbTokens.currentTokens}
      onTokenClicked={dbTokens.updateSelectedToken}
      selectedTokens={dbTokens.selectedTokens}
      getSelectedTokenData={dbTokens.getSelectedTokenData}
      decrementTokenAmounts={dbTokens.updateTokenValues}
      updateSelectedTokenValue={dbTokens.updateSelectedTokenValue}
      selectedTokenValues={dbTokens.selectedTokenValues}
    />
  );
};

export default Inventory;
