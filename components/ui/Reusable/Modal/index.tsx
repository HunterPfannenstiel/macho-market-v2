import { CSSProperties, FunctionComponent, ReactNode } from "react";
import { ModalProps as MProps } from "@_types/index";
import classes from "./index.module.css";
import Background from "./Background";
import ModalPortal from "./ModalPortal";

interface ModalProps {
  children: ReactNode;
  modalProps: MProps;
  className?: string;
  selector?: string;
}

const Modal: FunctionComponent<ModalProps> = ({
  children,
  modalProps,
  className,
  selector = "modal",
}) => {
  const { playAnimation, toggle, animationTime } = modalProps;
  let classN = className
    ? `${classes.modal_content} ${className}`
    : classes.modal_content;

  if (playAnimation) classN += " " + classes.animate_out;
  return (
    <ModalPortal selector={selector}>
      <div
        className={classN}
        style={
          { "--animation-time": (animationTime || 300) + "ms" } as CSSProperties
        }
      >
        <p className={classes.close} onClick={toggle}>
          X
        </p>
        {children}
      </div>
      <Background
        handleModal={toggle}
        playAnimation={playAnimation}
        animationTime={animationTime || 300}
      />
    </ModalPortal>
  );
};

export default Modal;
