"use client";

import { FunctionComponent, ReactNode } from "react";
import { Web3Config } from "./Web3Config";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return <Web3Config>{children}</Web3Config>;
};

export default Providers;
