import {
  ReactNode,
  createContext,
  FunctionComponent,
  useEffect,
  useState,
  useContext,
} from "react";
import {
  getInitialContext,
  getIntitialMetaMaskDetails,
  initializeMetaMaskState,
} from "./utils";
import useAccount from "@_hooks/web3/useAccount";

const MetaMask = createContext(getInitialContext());

interface MetaMaskProviderProps {
  children: ReactNode;
}

const MetaMaskProvider: FunctionComponent<MetaMaskProviderProps> = ({
  children,
}) => {
  const [metaMask, setMetaMask] = useState(getIntitialMetaMaskDetails());
  const account = useAccount();
  useEffect(() => {
    setMetaMask(initializeMetaMaskState());
    window?.ethereum?.on("chainChanged", reloadPage);
    return () => {
      window?.ethereum?.removeListener("chainChanged", reloadPage);
    };
  }, []);
  return (
    <MetaMask.Provider
      value={{ ...metaMask, account, chainId: window?.ethereum?.chainId }}
    >
      {children}
    </MetaMask.Provider>
  );
};

const reloadPage = () => {
  location.reload();
};

export default MetaMaskProvider;

export const useMetaMask = () => {
  return useContext(MetaMask);
};
