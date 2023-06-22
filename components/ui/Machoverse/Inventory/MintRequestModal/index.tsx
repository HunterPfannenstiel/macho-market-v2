import { FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import Modal from "components/ui/Reusable/Modal";
import { ModalProps } from "@_types/index";
import RequestItemList from "./RequestItemList";
import { MachoToken, TransactionInfo, UserToken } from "@_types/machoverse";
import Button from "components/ui/Reusable/Buttons/Button";

interface MintRequestModalProps {
  modalProps: ModalProps;
  selectedTokens: MachoToken[];
}

const MintRequestModal: FunctionComponent<MintRequestModalProps> = ({
  modalProps,
  selectedTokens,
}) => {
  const tokenValues = useRef<{ [id: number]: number }>({});
  const updateTokenValue = (id: number, value: number) => {
    tokenValues.current[id] = value;
  };
  const onCreateRequest = async () => {
    const tokens: UserToken[] = Object.keys(tokenValues.current).map((key) => {
      return { tokenId: +key, amount: tokenValues.current[+key] };
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
      const { data: rawData, signature } = data as TransactionInfo;
      console.log(data);
    }
    console.log(tokenValues);
  };
  return (
    <Modal modalProps={modalProps} className={classes.modal}>
      <RequestItemList
        tokens={selectedTokens}
        updateTokenValue={updateTokenValue}
      />
      <Button onClick={onCreateRequest}>Create Request</Button>
    </Modal>
  );
};

export default MintRequestModal;
