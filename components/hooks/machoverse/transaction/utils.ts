import { Transaction } from "@_types/machoverse";
import {
  createMintRequest,
  mintTransactionToBlockchain,
} from "@_utils/web3/mint-request";
import Web3API from "custom-objects/Fetch/API";
import { BrowserProvider } from "ethers";

type TransactionDelegate = () => Promise<any>;

export type MutateTransaction = {
  dbDelegate: TransactionDelegate;
  clientDelegate: (transactions: Transaction[]) => void;
  pageNumber: number;
};

export const updateTransaction = async ({ dbDelegate }: MutateTransaction) => {
  await dbDelegate();
};

export const remintTransaction =
  (
    provider: BrowserProvider | null,
    transactionId: number
  ): TransactionDelegate =>
  async () => {
    if (!provider) {
      throw new Error("Please connect wallet");
    }
    const data = await createMintRequest("Remint", undefined, transactionId);
    if (data) {
      mintTransactionToBlockchain(data, provider!);
    }
  };

export const modifyRemintedTransaction =
  (index: number) => (transactions: Transaction[]) => {
    transactions[index].completed_on = new Date().toUTCString();
    transactions[index].confirmed = true;
  };

export const reclaimTransaction =
  (transactionId: number): TransactionDelegate =>
  async () => {
    const res = await Web3API.Post(
      "/database/reclaim-transaction",
      JSON.stringify({ transactionId })
    );
    if (!res.success) {
      throw new Error(res.errorMessage);
    }
  };

export const modifyReclaimedTransaction =
  (index: number) => (transactions: Transaction[]) => {
    transactions[index].completed_on = new Date().toUTCString();
  };

//  tokens?: UserToken[],
//transactionId?: number
