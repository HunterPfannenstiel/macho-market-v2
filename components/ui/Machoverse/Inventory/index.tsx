"use client";

import { FunctionComponent, useState } from "react";
import classes from "./Inventory.module.css";
import { MachoToken } from "@_types/machoverse";
import InventoryTokenList from "components/ui/Reusable/Inventory/InventoryTokenList";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import Button from "components/ui/Reusable/Buttons/Button";
import MintRequestModal from "./MintRequestModal";

interface InventoryProps {
  tokens: MachoToken[];
}

const Inventory: FunctionComponent<InventoryProps> = ({ tokens }) => {
  const [selectedTokens, setSelectedTokens] = useState<{
    [id: number]: boolean;
  }>({});
  const mintRequestModal = useAnimateModal();
  const getSelectedTokenData = () => {
    return tokens.filter((token) => selectedTokens[token.tokenId]);
  };
  const onTokenClicked = (id: number) => {
    setSelectedTokens((prevState) => {
      const copy = { ...prevState };
      if (copy[id]) delete copy[id];
      else copy[id] = true;
      return copy;
    });
  };
  return (
    <>
      <Button onClick={mintRequestModal.toggle}>Create Mint Request</Button>
      <InventoryTokenList
        tokens={tokens}
        onTokenClicked={onTokenClicked}
        selectedTokenIds={selectedTokens}
      />
      {mintRequestModal.showModal && (
        <MintRequestModal
          modalProps={mintRequestModal}
          selectedTokens={getSelectedTokenData()}
        />
      )}
    </>
  );
};

export default Inventory;
