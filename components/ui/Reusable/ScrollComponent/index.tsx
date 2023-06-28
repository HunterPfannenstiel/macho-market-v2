import { FunctionComponent, ReactNode } from "react";
import classes from "./ScrollComponent.module.css";
import ScrollIcon from "./LoadingIcon";

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
    <ul ref={setScroll} className={className}>
      {children}
      {isFetching ? loadingNode ? loadingNode : <ScrollIcon /> : <></>}
    </ul>
  );
};

export default ScrollComponent;
