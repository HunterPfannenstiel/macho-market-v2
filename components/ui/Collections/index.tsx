"use client";

import { FunctionComponent } from "react";
import classes from "./Collections.module.css";
import useCollections from "@_hooks/useCollections";

interface CollectionsProps {}

const Collections: FunctionComponent<CollectionsProps> = () => {
  const collections = useCollections();
  return (
    <>
      {collections.map((collection) => {
        return <p>{collection.title}</p>;
      })}
    </>
  );
};

export default Collections;
