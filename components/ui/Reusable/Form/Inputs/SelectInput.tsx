import { FunctionComponent } from "react";
import classes from "./Select.module.css";

interface SelectInputProps {
  type: "checkbox" | "radio";
  id: string;
  name?: string;
  onSelectHandler: () => void;
  defaultChecked?: boolean;
  className?: string;
}

const SelectInput: FunctionComponent<SelectInputProps> = ({
  type,
  id,
  name,
  onSelectHandler,
  defaultChecked,
  className,
}) => {
  const classNameType = type === "checkbox" ? classes.checkbox : classes.radio;
  const classN = className ? `${classNameType} ${className}` : classNameType;
  return (
    <input
      className={classN}
      id={id}
      name={name}
      type={type}
      onChange={onSelectHandler}
      defaultChecked={defaultChecked}
    />
  );
};

export default SelectInput;
