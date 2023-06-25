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
  const txState = getTransactionState(
    transaction.created_on,
    transaction.completed_on,
    transaction.confirmed
  );
  let amount = 0;
  transaction.tokens.forEach((token) => {
    amount += token.amount;
  });
  return (
    <>
      <div
        className={`${classes.container} ${txState.className} item_container`}
      >
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
          {txState.buttonText && (
            <Button
              onClick={buttonAction.bind(
                null,
                txState.status,
                provider,
                transaction.transaction_id
              )}
            >
              {txState.buttonText}
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

const getTransactionState = (
  created_on: string,
  completed_on: string | null,
  confirmed: boolean
) => {
  if (completed_on)
    return {
      status: "Complete",
      buttonText: undefined,
      className: confirmed ? classes.confirmed : classes.reclaimed,
    };
  const expireTime = new Date(created_on).getTime() + 5 * 60000; //add 5 minutes to created time;
  const currentTime = new Date().getTime();
  return currentTime < expireTime
    ? { status: "Pending", buttonText: "Remint", className: classes.pending }
    : { status: "Expired", buttonText: "Reclaim", className: classes.reclaim };
};

const buttonAction = async (
  status: string,
  proivder: BrowserProvider | null,
  transactionId: number
) => {
  if (status === "Pending") {
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
