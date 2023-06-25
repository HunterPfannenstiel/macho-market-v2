import { FunctionComponent } from "react";
import classes from "./LayoutHeading.module.css";

interface LayoutHeadingProps {
  firstHalf: string;
  seceondHalf: string;
}

const LayoutHeading: FunctionComponent<LayoutHeadingProps> = ({
  firstHalf,
  seceondHalf,
}) => {
  return (
    <h1 className={classes.heading}>
      <span className={classes.white}>{firstHalf}</span>
      <span className={classes.yellow}>{seceondHalf}</span>
    </h1>
  );
};

export default LayoutHeading;
