import { FunctionComponent } from "react";
import classes from "./Machoverse.module.css";
import { useMachoAccount } from "@_providers/Machoverse/Account";
import Link from "next/link";

interface MachoverseProps {}

const Machoverse: FunctionComponent<MachoverseProps> = () => {
  return <Link href={"/machoverse/login"}>Login</Link>;
};

export default Machoverse;
