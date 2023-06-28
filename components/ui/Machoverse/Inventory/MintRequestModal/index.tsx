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
  onConfirmTransaction: () => void;
  selectedTokenValues: { [id: number]: number };
  updateSelectedTokenValue: (id: number, amount: number) => void;
}

const MintRequestModal: FunctionComponent<MintRequestModalProps> = ({
  modalProps,
  selectedTokens,
  onConfirmTransaction,
  updateSelectedTokenValue,
}) => {
  return (
    <Modal modalProps={modalProps} className={classes.modal}>
      <div className={classes.item_list}>
        <RequestItemList
          tokens={selectedTokens}
          updateTokenValue={updateSelectedTokenValue}
        />
      </div>
      <Button onClick={onConfirmTransaction} className={classes.create_button}>
        Create Request
      </Button>
    </Modal>
  );
};

export default MintRequestModal;
