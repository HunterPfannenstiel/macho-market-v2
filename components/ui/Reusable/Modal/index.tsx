import { CSSProperties, FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import Background from "./Background";
import ModalPortal from "./ModalPortal";

interface ModalProps {
  children: ReactNode;
  handleModal: () => void;
  playAnimation: boolean;
  className?: string;
  animationTime?: number;
  selector?: string;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  handleModal,
  playAnimation,
  className,
  animationTime = 300,
  selector = "modal",
}) => {
  let classN = className
    ? `${classes.modal_content} ${className}`
    : classes.modal_content;

  if (playAnimation) classN += " " + classes.animate_out;
  return (
    <ModalPortal selector={selector}>
      <div
        className={classN}
        style={{ "--animation-time": animationTime + "ms" } as CSSProperties}
      >
        <p className={classes.close} onClick={handleModal}>
          X
        </p>
        {children}
      </div>
      <Background
        handleModal={handleModal}
        playAnimation={playAnimation}
        animationTime={animationTime}
      />
    </ModalPortal>
  );
};

export default Modal;
