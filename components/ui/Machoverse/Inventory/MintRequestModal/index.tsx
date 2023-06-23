import { FunctionComponent } from "react";
import classes from "./index.module.css";
import Modal from "components/ui/Reusable/Modal";
import { ModalProps } from "@_types/index";
import RequestItemList from "./RequestItemList";
import { TransactionInfo, UserToken } from "@_types/machoverse";
import Button from "components/ui/Reusable/Buttons/Button";
import { BrowserProvider } from "ethers";
import { createMintRequest } from "@_utils/web3/mint-request";

interface MintRequestModalProps {
  modalProps: ModalProps;
  selectedTokens: UserToken[];
  onConfirmMint: (details: TransactionInfo) => void;
  provider: BrowserProvider | null;
  selectedTokenValues: { [id: number]: number };
  updateSelectedTokenValue: (id: number, amount: number) => void;
}

const MintRequestModal: FunctionComponent<MintRequestModalProps> = ({
  modalProps,
  selectedTokens,
  onConfirmMint,
  provider,
  selectedTokenValues,
  updateSelectedTokenValue,
}) => {
  const onCreateRequest = async () => {
    const tokens = Object.keys(selectedTokenValues).map((key) => {
      return { tokenId: +key, amount: selectedTokenValues[+key] };
    });
    createMintRequest("Mint", provider, onConfirmMint, tokens);
  };
  return (
    <Modal modalProps={modalProps} className={classes.modal}>
      <div className={classes.item_list}>
        <RequestItemList
          tokens={selectedTokens}
          updateTokenValue={updateSelectedTokenValue}
        />
      </div>
      <Button onClick={onCreateRequest} className={classes.create_button}>
        Create Request
      </Button>
    </Modal>
  );
};

export default MintRequestModal;
