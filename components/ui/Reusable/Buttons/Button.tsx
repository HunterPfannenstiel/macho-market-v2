import { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  backgroundColor?: string;
  className?: string;
  disabled?: boolean;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  disabled,
  ...rest
}) => {
  const classN = className ? `${classes.button} ${className}` : classes.button;
  return (
    <button {...rest} disabled={disabled} className={classN}>
      {children}
    </button>
  );
};

export default Button;
