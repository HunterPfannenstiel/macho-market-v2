"use client";

import { FunctionComponent, useEffect } from "react";
import classes from "./index.module.css";
import { useMachoAccount } from "@_providers/Machoverse/Account";
import { SessionDetails } from "@_types/machoverse";

interface AccountInfoProps {
  session?: SessionDetails;
}

const AccountInfo: FunctionComponent<AccountInfoProps> = ({ session }) => {
  const {
    userName: machoName,
    initializeSession,
    isSignedIn,
  } = useMachoAccount();
  useEffect(() => {
    session && initializeSession(session);
  }, []);
  return (
    <div className={classes.account}>
      <div className={classes.color} />
      <p>{isSignedIn ? machoName : "Sign In!"}</p>
    </div>
  );
};

export default AccountInfo;
