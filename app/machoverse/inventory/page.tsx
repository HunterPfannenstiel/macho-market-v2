import { UserToken } from "@_types/machoverse";
import { cookies } from "next/headers";
import Inventory from "components/ui/Machoverse/Inventory";

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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/user-tokens`,
    { headers: { Cookie: cookies().toString() }, cache: "no-store" }
  );

  const data = await res.json();
  if (!res.ok) {
    console.log("sign in error", data);
    return [];
  }
  return data as UserToken[];
};
