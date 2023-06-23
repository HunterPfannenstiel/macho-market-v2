import { FunctionComponent } from "react";
import classes from "./TextInput.module.css";

interface TextInputProps {
  label?: string;
  onInputChange: (value: string) => void;
  defaultValue?: string;
  type?: string;
  id?: string;
}

const TextInput: FunctionComponent<TextInputProps> = ({
  label,
  onInputChange,
  defaultValue,
  type,
  id,
}) => {
  return (
    <div className={classes.input}>
      {label && <label htmlFor={id || label}>{label}</label>}
      <input
        id={id || label}
        type={type || "text"}
        defaultValue={defaultValue}
        onChange={(e) => {
          onInputChange(e.target.value);
        }}
      />
    </div>
  );
};

export default TextInput;
