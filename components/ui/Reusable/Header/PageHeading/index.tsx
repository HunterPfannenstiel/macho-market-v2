"use client";

import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import { useSelectedLayoutSegment } from "next/navigation";

interface PageHeadingProps {
  indexPageName: ReactNode;
}

const PageHeading: FunctionComponent<PageHeadingProps> = ({
  indexPageName,
}) => {
  const segment = useSelectedLayoutSegment();
  let element = indexPageName;
  if (segment) element = pages[segment];
  return (
    <div className={classes.page_heading}>
      {typeof element === "string" ? (
        <h2 className={classes.title}>{element}</h2>
      ) : (
        element
      )}
    </div>
  );
};

export default PageHeading;

const pages: { [p: string]: ReactNode } = {
  inventory: "Inventory",
  transactions: "Transactions",
};
