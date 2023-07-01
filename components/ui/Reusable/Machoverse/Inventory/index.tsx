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
  onConfirmTransaction: (tokens: UserToken[]) => Promise<void>;
  modalProps: ModalProps;
}

const Inventory: FunctionComponent<InventoryProps> = ({
  tokens,
  onTokenClicked,
  selectedTokens,
  getSelectedTokenData,
  onConfirmTransaction,
  modalProps,
}) => {
  const onMintRequest = (selectedValues: { [id: number]: number }) => {
    const tokens: UserToken[] = Object.keys(selectedValues).map((key) => {
      return { tokenId: +key, amount: selectedValues[+key] };
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
          onConfirmTransaction={onMintRequest}
          modalProps={modalProps}
          selectedTokens={getSelectedTokenData()}
        />
      )}
    </>
  );
};

export default Inventory;
