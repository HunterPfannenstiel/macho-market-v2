import { FunctionComponent, useState } from "react";
import classes from "./index.module.css";
import { MachoToken, TransactionInfo } from "@_types/machoverse";
import InventoryTokenList from "components/ui/Reusable/Inventory/InventoryTokenList";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import Button from "components/ui/Reusable/Buttons/Button";
import MintRequestModal from "../MintRequestModal";
import { loadMachoverse } from "@_utils/web3/contract";
import { useMetaMask } from "@_providers/Metamask";
import { Selections } from "@_types/index";

interface DatabaseInventoryProps {
  tokens: MachoToken[];
  onTokenClicked: (id: number) => void;
  selectedTokens: Selections;
  getSelectedTokenData: () => MachoToken[];
  decrementTokenAmounts: () => void;
  selectedTokenValues: { [id: number]: number };
  updateSelectedTokenValue: (id: number, amount: number) => void;
}

const DatabaseInventory: FunctionComponent<DatabaseInventoryProps> = ({
  tokens,
  onTokenClicked,
  selectedTokens,
  getSelectedTokenData,
  decrementTokenAmounts,
  selectedTokenValues,
  updateSelectedTokenValue,
}) => {
  const { provider } = useMetaMask();
  const mintRequestModal = useAnimateModal();

  const onConfirmMint = async ({ data, signature }: TransactionInfo) => {
    mintRequestModal.toggle();
    decrementTokenAmounts();
    console.log("Loading contract");
    try {
      const contract = await loadMachoverse(provider!);
      const tx = await contract.mintTokens(data, signature);
    } catch (error: any) {
      console.log("ERROR", error.message);
    }
    console.log("contract loaded");
  };
  return (
    <>
      <Button
        onClick={mintRequestModal.toggle}
        disabled={Object.keys(selectedTokens).length === 0}
      >
        Create Mint Request
      </Button>
      <InventoryTokenList
        tokens={tokens}
        onTokenClicked={onTokenClicked}
        selectedTokenIds={selectedTokens}
      />
      {mintRequestModal.showModal && (
        <MintRequestModal
          selectedTokenValues={selectedTokenValues}
          updateSelectedTokenValue={updateSelectedTokenValue}
          provider={provider}
          onConfirmMint={onConfirmMint}
          modalProps={mintRequestModal}
          selectedTokens={getSelectedTokenData()}
        />
      )}
    </>
  );
};

export default DatabaseInventory;
