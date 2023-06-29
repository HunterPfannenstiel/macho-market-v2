"use client";

import { FunctionComponent } from "react";
import { TransactionInfo, UserToken } from "@_types/machoverse";
import useHandleTokens from "@_hooks/machoverse/useHandleTokens";
import Button from "@_reuseable/Buttons/Button";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import Inventory from "@_reuseable/Machoverse/Inventory";
import { mintTransactionToBlockchain } from "@_utils/web3/mint-request";
import { useMetaMask } from "@_providers/Metamask";
import Link from "next/link";

interface InventoryProps {
  // tokens: UserToken[];
}

const MachoInventory: FunctionComponent<InventoryProps> = ({}) => {
  const onConfirmMint = async (data?: TransactionInfo) => {
    if (data) {
      mintTransactionToBlockchain(data, provider!);
      mintRequestModal.toggle();
    }
  };
  const mintRequestModal = useAnimateModal();
  const tokens = useHandleTokens(onConfirmMint, mintRequestModal.toggle);
  const { provider } = useMetaMask();

  const createDBRequest = async (updateTokens: UserToken[]) => {
    tokens.updateTokenValues(updateTokens);
  };
  return (
    <>
      <div>
        <Link href={{ query: "inventory=game" }}>In game tokens</Link>
        <Link href={{ query: "inventory=blockchain" }}>Blockchain tokens</Link>
      </div>
      <Button
        onClick={mintRequestModal.toggle}
        disabled={Object.keys(tokens.selectedTokens).length === 0}
      >
        Create Mint Request
      </Button>
      <Inventory
        tokens={tokens.currentTokens}
        onTokenClicked={tokens.updateSelectedToken}
        selectedTokens={tokens.selectedTokens}
        getSelectedTokenData={tokens.getSelectedTokenData}
        selectedTokenValues={tokens.selectedTokenValues}
        onConfirmTransaction={createDBRequest}
        modalProps={mintRequestModal}
      />
    </>
  );
};

export default MachoInventory;
