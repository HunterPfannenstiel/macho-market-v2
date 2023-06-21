import { UserToken } from "@_types/machoverse";
import { cookies } from "next/headers";
import Inventory from "components/ui/Account/Inventory";

const InventoryPage = async () => {
  const tokens = await getUserTokens();
  return <Inventory tokens={tokens || []} />;
};

const getUserTokens = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/user-tokens`,
    { headers: { Cookie: cookies().toString() }, cache: "no-store" }
  );
  const data = await res.json();
  if (!res.ok) {
    console.log("Error", data);
  } else return data as UserToken[];
};

export default InventoryPage;
