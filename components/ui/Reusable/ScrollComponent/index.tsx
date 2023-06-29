import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import LoadingIcon from "./LoadingIcon";

interface ScrollComponentProps {
  children: ReactNode;
  isFetching: boolean;
  setScroll: (elem: HTMLElement | null) => void;
  className?: string;
  loadingNode?: ReactNode;
}

const ScrollComponent: FunctionComponent<ScrollComponentProps> = ({
  children,
  isFetching,
  setScroll,
  className,
  loadingNode,
}) => {
  return (
    <ul
      ref={setScroll}
      className={`${classes.scroll} ${className ? className : ""}`}
    >
      {children}
      {isFetching ? loadingNode ? loadingNode : <LoadingIcon /> : <></>}
    </ul>
  );
};

export default ScrollComponent;
