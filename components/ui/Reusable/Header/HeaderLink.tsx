import { FunctionComponent } from "react";
import classes from "./HeaderLink.module.css";
import Link from "next/link";

interface HeaderLinkProps {
  href: string;
  text: string;
}

const HeaderLink: FunctionComponent<HeaderLinkProps> = ({ href, text }) => {
  return (
    <Link href={href} className={classes.link}>
      {text}
    </Link>
  );
};

export default HeaderLink;
