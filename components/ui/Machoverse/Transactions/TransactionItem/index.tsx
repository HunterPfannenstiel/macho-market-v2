import { FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import { MachoToken, Transaction } from "@_types/machoverse";
import Button from "../../../Reusable/Buttons/Button";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import MintRequestModal from "../../Inventory/MintRequestModal";
import Modal from "components/ui/Reusable/Modal";
import RequestItemList from "../../Inventory/MintRequestModal/RequestItemList";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: FunctionComponent<TransactionItemProps> = ({
  transaction,
}) => {
  const tokenModal = useAnimateModal();
  const tokens = useRef<MachoToken[]>([]);
  let txState = "";
  let className = "";
  let buttonText = "";
  if (transaction.confirmed) {
    txState = "confirmed";
    className = classes.confirmed;
  } else if (transaction.pending) {
    //compare createdOn and currentTime
    //buttonText = "Reclaim"
    txState = "pending";
    className = classes.pending;
    buttonText = "Mint";
  } else {
    txState = "reclaimed";
    className = classes.reclaimed;
  }
  className += " " + classes.container;
  return (
    <>
      <div className={className + " " + "item_container"}>
        <div className={classes.transaction_info}>
          <p>
            Created On:{" "}
            <span>{new Date(transaction.created_on).toLocaleString()}</span>
          </p>
          <p>
            Total token count: <span>{100}</span>
          </p>
        </div>
        <div className={classes.transaction_buttons}>
          <Button
            onClick={() => {
              tokens.current = transaction.tokens;
              tokenModal.toggle();
            }}
          >
            View Tokens
          </Button>
          {buttonText && <Button>{buttonText}</Button>}
        </div>
      </div>
      {tokenModal.showModal && (
        <Modal modalProps={tokenModal}>
          <RequestItemList tokens={tokens.current} showNumberInput={false} />
        </Modal>
      )}
    </>
  );
};

export default TransactionItem;
