import { FunctionComponent } from "react";
import classes from "./index.module.css";
import { TransactionInfo, UserToken } from "@_types/machoverse";
import InventoryTokenList from "components/ui/Reusable/Inventory/InventoryTokenList";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import Button from "components/ui/Reusable/Buttons/Button";
import MintRequestModal from "../MintRequestModal";
import { loadMachoverse } from "@_utils/web3/contract";
import { useMetaMask } from "@_providers/Metamask";
import { Selections } from "@_types/index";
import { mintTransactionToBlockchain } from "@_utils/web3/mint-request";

interface DatabaseInventoryProps {
  tokens: UserToken[];
  onTokenClicked: (id: number) => void;
  selectedTokens: Selections;
  getSelectedTokenData: () => UserToken[];
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

  const onConfirmMint = async (data: TransactionInfo) => {
    mintTransactionToBlockchain(data, provider!);
    mintRequestModal.toggle();
    decrementTokenAmounts();
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
