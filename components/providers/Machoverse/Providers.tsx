"use client";

import { FunctionComponent, ReactNode } from "react";
import classes from "./Providers.module.css";
import AccountProvider from "./Account";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return <AccountProvider>{children}</AccountProvider>;
};

export default Providers;
