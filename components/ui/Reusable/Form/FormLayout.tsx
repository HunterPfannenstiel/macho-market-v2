import { FormEvent, FunctionComponent, ReactNode } from "react";
import classes from "./FormLayout.module.css";
import Button from "../Buttons/Button";

interface FormLayoutProps {
  children: ReactNode;
  onSubmit: (e: FormEvent) => void;
  className?: string;
  buttonText: string;
}

const FormLayout: FunctionComponent<FormLayoutProps> = ({
  children,
  className,
  onSubmit,
  buttonText,
}) => {
  const classN = className ? `${classes.form} ${className}` : classes.form;
  return (
    <form className={classN} onSubmit={onSubmit}>
      {children}
      <Button>{buttonText}</Button>
    </form>
  );
};

export default FormLayout;
