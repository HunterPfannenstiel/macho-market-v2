import { FunctionComponent } from "react";
import classes from "./Header.module.css";
import Header from "@_reuseable/Header";
import AccountInfo from "./AccountInfo";
import { SessionDetails } from "@_types/machoverse";

const MachoHeader: FunctionComponent<{
  session?: SessionDetails;
  headingHref: string;
}> = ({ session, headingHref }) => {
  return (
    <Header
      links={[
        { href: "/machoverse/inventory", text: "Inventory" },
        { href: "/machoverse/transactions", text: "Transactions" },
      ]}
      headingHref={headingHref}
      headingText={["MACHO", "VERSE"]}
      accountComponent={<AccountInfo session={session} />}
    />
  );
};

export default MachoHeader;
