import { FunctionComponent } from "react";
import { UserToken } from "@_types/machoverse";
import InventoryTokenList from "components/ui/Reusable/Inventory/InventoryTokenList";
import { ModalProps, Selections } from "@_types/index";
import MintRequestModal from "_@ui/Machoverse/Inventory/MintRequestModal";

interface InventoryProps {
  tokens: UserToken[];
  onTokenClicked: (id: number) => void;
  selectedTokens: Selections;
  getSelectedTokenData: () => UserToken[];
  selectedTokenValues: { [id: number]: number };
  updateSelectedTokenValue: (id: number, amount: number) => void;
  onConfirmTransaction: (tokens: UserToken[]) => Promise<void>;
  modalProps: ModalProps;
}

const Inventory: FunctionComponent<InventoryProps> = ({
  tokens,
  onTokenClicked,
  selectedTokens,
  getSelectedTokenData,
  selectedTokenValues,
  updateSelectedTokenValue,
  onConfirmTransaction,
  modalProps,
}) => {
  const onMintRequest = () => {
    const tokens: UserToken[] = Object.keys(selectedTokenValues).map((key) => {
      return { tokenId: +key, amount: selectedTokenValues[+key] };
    });
    onConfirmTransaction(tokens);
  };
  return (
    <>
      <InventoryTokenList
        tokens={tokens}
        onTokenClicked={onTokenClicked}
        selectedTokenIds={selectedTokens}
      />
      {modalProps.showModal && (
        <MintRequestModal
          selectedTokenValues={selectedTokenValues}
          updateSelectedTokenValue={updateSelectedTokenValue}
          onConfirmTransaction={onMintRequest}
          modalProps={modalProps}
          selectedTokens={getSelectedTokenData()}
        />
      )}
    </>
  );
};

export default Inventory;
