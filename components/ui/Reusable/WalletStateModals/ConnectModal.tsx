import { FunctionComponent } from "react";
import classes from "./ConnectModal.module.css";
import { ModalProps } from "@_types/index";
import Modal from "@_reuseable/Modal";
import { connectMetaMask } from "@_hooks/web3/useAccount";

interface ConnectModalProps {
  modalProps: ModalProps;
}

const ConnectModal: FunctionComponent<ConnectModalProps> = ({ modalProps }) => {
  return (
    <Modal modalProps={modalProps}>
      <p onClick={connectMetaMask}>Please connect your wallet</p>
    </Modal>
  );
};

export default ConnectModal;
