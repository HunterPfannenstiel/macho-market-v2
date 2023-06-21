import { FunctionComponent } from "react";
import classes from "./LinkWalletPage.module.css";
import LinkWallet from "components/ui/Account/LinkWallet";

interface LinkWalletPageProps {}

const LinkWalletPage: FunctionComponent<LinkWalletPageProps> = () => {
  return <LinkWallet></LinkWallet>;
};

export default LinkWalletPage;
