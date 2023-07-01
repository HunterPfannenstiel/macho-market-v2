"use client";

import { FunctionComponent, ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Web3Config } from "./Web3Config";
import MetaMaskProvider from "./Metamask";
import WalletStateProvider from "./WalletState";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const Providers: FunctionComponent<ProvidersProps> = ({ children }) => {
  return (
    <MetaMaskProvider>
      <WalletStateProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WalletStateProvider>
    </MetaMaskProvider>
  );
};

export default Providers;
