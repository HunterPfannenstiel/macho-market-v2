import { FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import Modal from "components/ui/Reusable/Modal";
import { ModalProps } from "@_types/index";
import RequestItemList from "./RequestItemList";
import { MachoToken, TransactionInfo, UserToken } from "@_types/machoverse";
import Button from "components/ui/Reusable/Buttons/Button";
import { BrowserProvider } from "ethers";

interface MintRequestModalProps {
  modalProps: ModalProps;
  selectedTokens: MachoToken[];
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
    if (!provider) {
      console.log("Please connect wallet");
      return;
    }
    const tokens: UserToken[] = Object.keys(selectedTokenValues).map((key) => {
      return { tokenId: +key, amount: selectedTokenValues[+key] };
    });
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/mint`,
      {
        method: "POST",
        body: JSON.stringify({ tokens }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log("Error!", data);
    } else {
      onConfirmMint(data as TransactionInfo);
    }
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
