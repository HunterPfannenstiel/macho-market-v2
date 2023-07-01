import { FunctionComponent } from "react";
import classes from "./NetworkModal.module.css";
import Modal from "@_reuseable/Modal";
import { ModalProps } from "@_types/index";
import { changeChain } from "@_providers/Metamask/utils";

interface NetworkModalProps {
  modalProps: ModalProps;
  correctChainId: string;
}

const NetworkModal: FunctionComponent<NetworkModalProps> = ({
  modalProps,
  correctChainId,
}) => {
  return (
    <Modal modalProps={modalProps}>
      <p onClick={changeChain.bind(null, correctChainId)}>
        Please Connect to the __ network
      </p>
    </Modal>
  );
};

export default NetworkModal;
