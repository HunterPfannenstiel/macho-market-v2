import { FunctionComponent, HTMLAttributes, ReactNode } from "react";
import classes from "./Button.module.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  backgroundColor?: string;
}

const Button: FunctionComponent<ButtonProps> = ({ children, ...rest }) => {
  return (
    <button {...rest} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
