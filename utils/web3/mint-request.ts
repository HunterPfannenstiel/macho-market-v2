import { TransactionInfo, UserToken } from "@_types/machoverse";
import { BrowserProvider } from "ethers";
import { loadMachoverse } from "./contract";
import Web3API from "custom-objects/Fetch/API";

export const createMintRequest = async (
  action: "Mint" | "Remint",
  tokens?: UserToken[],
  transactionId?: number
) => {
  if (action === "Mint") {
    if (!tokens) {
      console.error("No tokens were provided");
      return;
    }
    const { data, success, errorMessage } = await Web3API.Post(
      "/database/mint",
      JSON.stringify({ tokens })
    );

    if (!success) {
      throw new Error(errorMessage);
    } else {
      return data as TransactionInfo;
    }
  } else {
    if (!transactionId) {
      console.error("No transaction id was provided");
      return;
    }
    const { data, success, errorMessage } = await Web3API.Get(
      `/database/transaction-info?transactionId=${transactionId}`
    );

    if (!success) {
      throw new Error(errorMessage);
    } else {
      return data as TransactionInfo;
    }
  }
};

export const mintTransactionToBlockchain = async (
  { data, signature }: TransactionInfo,
  provider: BrowserProvider
) => {
  console.log("Loading contract");
  try {
    const contract = await loadMachoverse(provider!);
    const tx = await contract.mintTokens(data, signature);
  } catch (error: any) {
    console.log("ERROR", error.message);
  }
  console.log("contract loaded");
};

//   : UserToken[] = Object.keys(selectedTokenValues).map((key) => {
//     return { tokenId: +key, amount: selectedTokenValues[+key] };
//   });
