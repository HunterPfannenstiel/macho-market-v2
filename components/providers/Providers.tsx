"use client";

import { FunctionComponent, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3Config } from "./Web3Config";
import MetaMaskProvider from "./Metamask";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <MetaMaskProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MetaMaskProvider>
  );
};

export default Providers;
