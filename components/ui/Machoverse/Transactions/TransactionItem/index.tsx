import { FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import { Transaction, UserToken } from "@_types/machoverse";
import Button from "../../../Reusable/Buttons/Button";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import Modal from "components/ui/Reusable/Modal";
import RequestItemList from "../../Inventory/MintRequestModal/RequestItemList";
import {
  createMintRequest,
  mintTransactionToBlockchain,
} from "@_utils/web3/mint-request";
import { BrowserProvider } from "ethers";
import { useMetaMask } from "@_providers/Metamask";

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: FunctionComponent<TransactionItemProps> = ({
  transaction,
}) => {
  const { provider } = useMetaMask();
  const tokenModal = useAnimateModal();
  const tokens = useRef<UserToken[]>([]);
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
  let amount = 0;
  transaction.tokens.forEach((token) => {
    amount += token.amount;
  });
  return (
    <>
      <div className={className + " " + "item_container"}>
        <div className={classes.transaction_info}>
          <p>
            Created On:{" "}
            <span>{new Date(transaction.created_on).toLocaleString()}</span>
          </p>
          <p>
            Total token count: <span>{amount}</span>
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
          {buttonText && (
            <Button
              onClick={buttonAction.bind(
                null,
                buttonText,
                provider,
                transaction.transaction_id
              )}
            >
              {buttonText}
            </Button>
          )}
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

const buttonAction = async (
  action: string,
  proivder: BrowserProvider | null,
  transactionId: number
) => {
  if (action === "Mint") {
    createMintRequest(
      "Remint",
      proivder,
      (data) => {
        mintTransactionToBlockchain(data, proivder!);
      },
      undefined,
      transactionId
    );
  }
};

export default TransactionItem;
