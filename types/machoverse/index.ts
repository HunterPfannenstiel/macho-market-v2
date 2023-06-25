export type UserToken = {
  tokenId: number;
  amount: number;
};

export type MachoToken = {
  name: string;
  image: string;
  type: "coin" | "item";
  colors: TokenColor;
};

export type MachoTokens = { [tokenId: number]: MachoToken };

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
  tokens: UserToken[];
  pending: boolean;
  confirmed: boolean;
  completed_on: string | null;
  transaction_id: number;
};

export type SessionDetails = {
  isSignedIn?: boolean;
  userName?: string;
  sessionExpiry?: Date;
  address?: string;
};
