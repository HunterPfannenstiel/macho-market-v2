import { FunctionComponent } from "react";
import classes from "./LoadingIcon.module.css";

interface LoadingIconProps {}

const LoadingIcon: FunctionComponent<LoadingIconProps> = () => {
  return (
    <div className={classes["lds-ellipsis"]}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default LoadingIcon;
