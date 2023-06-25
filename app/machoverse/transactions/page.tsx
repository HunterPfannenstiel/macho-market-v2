import { Transaction } from "@_types/machoverse";
import Transactions from "components/ui/Machoverse/Transactions";
import { cookies } from "next/headers";

const TransactionsPage = async () => {
  return <Transactions transactions={[]} />;
};

export default TransactionsPage;

// const getTransactions = async () => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/transactions`,
//     { headers: { Cookie: cookies().toString() }, cache: "no-store" }
//   );

//   const data = await res.json();
//   if (!res.ok) {
//     console.log("sign in error", data);
//     return [];
//   }
//   return data as Transaction[];
// };
