import { FunctionComponent, useState } from "react";
import classes from "./NumberInput.module.css";

interface NumberInputProps {
  min?: number;
  max?: number;
  className?: string;
  onChange: (value: number) => void;
  defaultValue?: number;
}

const NumberInput: FunctionComponent<NumberInputProps> = ({
  min,
  max,
  className,
  onChange,
  defaultValue = 0,
}) => {
  const [value, setValue] = useState(defaultValue);
  const classN = className ? `${classes.input} ${className}` : classes.input;
  return (
    <input
      type="number"
      min={min}
      max={max}
      className={classN}
      onChange={(e) => {
        const val = +e.target.value;
        console.log(val);
        if (max !== undefined && val > max) {
          onChange(max);
          setValue(max);
        } else if (min !== undefined && val < min) {
          onChange(min);
          setValue(min);
        } else {
          onChange(val);
          setValue(val);
        }
      }}
      value={value}
    />
  );
};

export default NumberInput;
