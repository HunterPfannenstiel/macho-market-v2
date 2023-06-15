"use client";

import { FunctionComponent, ReactNode } from "react";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";

const chains = [arbitrum, mainnet];
const projectId = "64ff0b462c84ab300c961a9c3971f251";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

interface Web3ConfigProps {
  children: ReactNode;
}

export const Web3Config: FunctionComponent<Web3ConfigProps> = ({
  children,
}) => {
  return <WagmiConfig config={wagmiConfig}>{children}</WagmiConfig>;
};

export const WalletModal: FunctionComponent = () => {
  return <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />;
};
