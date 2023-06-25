import { UserToken } from "@_types/machoverse";
import { cookies } from "next/headers";
import Inventory from "components/ui/Machoverse/Inventory";
import Web3API from "custom-objects/Web3API";

const InventoryPage = async () => {
  const tokens = await fetchInventory();
  return (
    <>
      <h1>Inventory!</h1>
      <Inventory tokens={tokens} />
    </>
  );
};

export default InventoryPage;

const fetchInventory = async () => {
  const res = await Web3API.Get<UserToken[]>(
    "/database/user-tokens",
    cookies().toString()
  );
  if (res.success) return res.data;
  else {
    console.error(res.errorMessage);
    return [];
  }
};
