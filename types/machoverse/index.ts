export type UserToken = {
  tokenId: number;
  amount: number;
};

export type MachoToken =
  | {
      tokenId: number;
      name: string;
      amount: number;
      image: string;
      type: "item";
      colors: null;
    }
  | {
      tokenId: number;
      name: string;
      amount: number;
      image: string;
      type: "coin";
      colors: TokenColor;
    };

type TokenColor = {
  borderColor: string;
  fillColor: string;
};

export type TransactionInfo = {
  data: string;
  signature: string;
};

export type Transaction = {
  created_on: string;
  tokens: MachoToken[];
  pending: boolean;
  confirmed: boolean;
  completed_on: string | null;
  transaction_id: number;
};
