import { ReactNode, createContext, useContext } from "react";
import { getInitialContext } from "./utils";
import { FunctionComponent } from "react";
import { useMetaMask } from "@_providers/Metamask";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import NetworkModal from "@_reuseable/WalletStateModals/NetworkModal";
import ConnectModal from "@_reuseable/WalletStateModals/ConnectModal";

const WalletState = createContext(getInitialContext());

interface WalletStateProviderProps {
  children: ReactNode;
}

const WalletStateProvider: FunctionComponent<WalletStateProviderProps> = ({
  children,
}) => {
  const { provider, isCorrectChain, correctChainId } = useMetaMask();
  const networkModal = useAnimateModal(300);
  const walletModal = useAnimateModal(300);
  const checkWalletState = async () => {
    let connected = false;
    try {
      if (provider) {
        const accounts = await provider?.listAccounts();
        connected = accounts.length > 0;
      }
    } catch (error) {}
    console.log("check wallet");
    if (!connected) {
      walletModal.toggle();
      return false;
    }
    if (!isCorrectChain) {
      networkModal.toggle();
      return false;
    }
    return true;
  };
  return (
    <WalletState.Provider value={{ checkWalletState }}>
      {networkModal.showModal && (
        <NetworkModal
          modalProps={networkModal}
          correctChainId={correctChainId as string}
        />
      )}
      {walletModal.showModal && <ConnectModal modalProps={walletModal} />}
      {children}
    </WalletState.Provider>
  );
};

export default WalletStateProvider;

export const useWalletState = () => useContext(WalletState);
