import { FunctionComponent, useEffect } from "react";
import classes from "./index.module.css";
import useGlobalActivity from "@_hooks/useGlobalActivity";

interface ActivityProps {}

const Activity: FunctionComponent<ActivityProps> = () => {
  const [activity, setScrollEvent] = useGlobalActivity();
  return (
    <ul className={classes.activity} ref={setScrollEvent}>
      {activity?.pages.map((page) => {
        return page.map((log) => {
          return <p>{log.logged_price}</p>;
        });
      })}
    </ul>
  );
};

export default Activity;
