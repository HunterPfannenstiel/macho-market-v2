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
