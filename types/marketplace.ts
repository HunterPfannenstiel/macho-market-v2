import { PageFetch } from ".";

export type CollectionListing = {
  token_id: number;
  amount: number;
  price: number;
  currency_id: number;
  seller: string;
};

export type ContractType =
  | "ERC20"
  | "ERC721"
  | "ERC721T"
  | "ERC1155"
  | "ERC1155T"
  | "ETHER";

export type Currency = {
  currency_id: number;
  decimals: number;
  fill_color: string;
  border_color: string;
  image: string;
  ticker: string;
  token_type: ContractType;
  address: string;
};

export type Collection = {
  title: string;
  description: string;
  image: string;
  supply?: number;
  token_type: ContractType;
};

export type ListingStatus = "Active" | "Updated" | "Purchased" | "Removed";

export type LogEntry = {
  listing_id: number;
  token_id: number;
  status: ListingStatus;
  logged_on: string;
  prev_price: number | null;
  logged_price: number;
  prev_amount: number | null;
  logged_amount: number;
  prev_currency: number | null;
  logged_currency: number;
  seller: string;
  buyer: string | null;
};

export type PageFetcher<T, U> = (
  pageInfo: PageFetch,
  dependency?: T
) => Promise<U>;
