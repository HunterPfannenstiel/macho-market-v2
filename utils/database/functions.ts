import {
  Collection,
  CollectionListing,
  Currency,
  LogEntry,
} from "@_types/marketplace";
import { userQuery } from "./connect";

export const viewCollectionListings = async (
  collectionTitle: string,
  afterTime: string,
  page: number,
  pageSize: number,
  filterCurrencyId?: number
) => {
  const query =
    "SELECT * FROM market.view_collection_listings($1, $2, $3, $4, $5)";
  const res = await userQuery(query, [
    collectionTitle,
    afterTime,
    page,
    pageSize,
    filterCurrencyId || null,
  ]);
  return res.rows as CollectionListing[];
};

export const getCurrencies = async (activeFilter?: boolean) => {
  const query = "SELECT * FROM market.get_currencies($1)";
  const res = await userQuery(query, [
    activeFilter === undefined ? null : activeFilter,
  ]);
  return res.rows as Currency[];
};

export const viewCollections = async (
  afterTime: string,
  page: number,
  pageSize: number
) => {
  const query = "SELECT * FROM market.view_collections($1, $2, $3)";
  const res = await userQuery(query, [afterTime, page, pageSize]);
  return res.rows as Collection[];
};

export const viewActivity = async (
  afterTime: string,
  page: number,
  pageSize: number,
  filterUserAddress?: string,
  filterListingId?: number,
  filterTokenId?: number
) => {
  const query = "SELECT * FROM market.view_activity($1, $2, $3, $4, $5, $6)";
  const res = await userQuery(query, [
    afterTime,
    page,
    pageSize,
    filterUserAddress || null,
    filterListingId === undefined ? null : filterListingId,
    filterTokenId === undefined ? null : filterTokenId,
  ]);

  return res.rows as LogEntry[];
};
