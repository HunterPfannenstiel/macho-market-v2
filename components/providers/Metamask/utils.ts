import { MetaMaskInpageProvider } from "@metamask/providers";
import { BrowserProvider, ethers } from "ethers";

declare global {
  interface Window {
    ethereum: MetaMaskInpageProvider;
  }
}

export const getInitialContext = (): MetaMaskContext => {
  return {
    ...getIntitialMetaMaskDetails(),
    account: "",
    chainId: null,
    correctChainId: null,
    isCorrectChain: null,
  };
};

export type MetaMaskDetails =
  | {
      provider: BrowserProvider;
      isLoading: false;
      isInstalled: true;
    }
  | {
      provider: null;
      isLoading: boolean;
      isInstalled: boolean | undefined;
    };

export type MetaMaskContext = MetaMaskDetails & {
  account: string | null;
  chainId: string | null;
  correctChainId: string | null;
  isCorrectChain: boolean | null;
};

export const getIntitialMetaMaskDetails = (): MetaMaskDetails => {
  return {
    provider: null,
    isLoading: true,
    isInstalled: undefined,
  };
};

export const initializeMetaMaskState = (): MetaMaskDetails => {
  if (!window.ethereum) {
    console.log("Metamask is not installed!");
    return { provider: null, isLoading: false, isInstalled: false };
  } else {
    const provider = new ethers.BrowserProvider(window.ethereum);
    // const provider = null;
    return { provider, isLoading: false, isInstalled: true };
    // const signer = await provider.getSigner(); //requests access to write operations (which are performed with the user's private key)
  }
};

export const chainIdToName = {
  "0x1": "Mainnet",
  "0x5": "Goerli",
  "0xa4b1": "Arbitrum",
} as { [key: string]: string };

export const changeChain = async (chainId: string) => {
  await window?.ethereum?.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId }],
  });
};
