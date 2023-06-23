import { TransactionInfo, UserToken } from "@_types/machoverse";
import { BrowserProvider } from "ethers";
import { loadMachoverse } from "./contract";

export const createMintRequest = async (
  action: "Mint" | "Remint",
  provider: BrowserProvider | null,
  mintHandler: (data: TransactionInfo) => void,
  tokens?: UserToken[],
  transactionId?: number
) => {
  if (!provider) {
    console.log("Please connect wallet");
    return;
  }
  if (action === "Mint") {
    if (!tokens) {
      console.error("No tokens were provided");
      return;
    }
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
      mintHandler(data as TransactionInfo);
    }
  } else {
    if (!transactionId) {
      console.error("No transaction id was provided");
      return;
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/transaction-info?transactionId=${transactionId}`,
      {
        credentials: "include",
      }
    );
    const data = await res.json();
    if (!res.ok) {
      console.log("Error!", data);
    } else {
      mintHandler(data as TransactionInfo);
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
