import { adminQuery, userQuery } from "./connect";

export const modifyListingContract = async (
  address: string,
  title?: string,
  description?: string,
  image?: string,
  contractTypeId?: number,
  supply?: number,
  fee?: number
) => {
  const query =
    "CALL market.modify_listing_contract($1, $2, $3, $4, $5, $6, $7)";
  await adminQuery(query, [
    address,
    title || null,
    description || null,
    image || null,
    contractTypeId === undefined ? null : contractTypeId,
    supply || null,
    fee || null,
  ]);
};

export const modifyCurrency = async (
  currencyId: number,
  contractTypeId?: number,
  address?: string,
  decimals?: number,
  image?: string,
  ticker?: string,
  color?: string,
  isActive?: boolean
) => {
  const query = "CALL market.modify_currency($1, $2, $3, $4, $5, $6, $7, $8)";
  await adminQuery(query, [
    currencyId,
    contractTypeId === undefined ? null : contractTypeId,
    address || null,
    decimals === undefined ? null : decimals,
    image || null,
    ticker || null,
    color || null,
    isActive === undefined ? null : isActive,
  ]);
};

export const createListing = async (
  listingId: number,
  itemAddress: string,
  tokenId: number,
  amount: number,
  price: number,
  currencyId: number,
  sellerAddress: string
) => {
  const query = "CALL market.create_listing($1, $2, $3, $4, $5, $6, $7)";
  await userQuery(query, [
    listingId,
    itemAddress,
    tokenId,
    amount,
    price,
    currencyId,
    sellerAddress,
  ]);
};

export const updateListing = async (
  listingId: number,
  listingStatusId?: number,
  price?: number,
  amount?: number,
  currencyId?: number,
  buyer?: string
) => {
  const query = "CALL market.update_listing($1, $2, $3, $4, $5, $6)";
  await userQuery(query, [
    listingId,
    listingStatusId === undefined ? null : listingStatusId,
    price === undefined ? null : price,
    amount === undefined ? null : amount,
    currencyId === undefined ? null : currencyId,
    buyer === undefined ? null : buyer,
  ]);
};
