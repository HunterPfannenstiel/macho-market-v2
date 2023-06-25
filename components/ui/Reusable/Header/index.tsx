import { FunctionComponent, ReactNode } from "react";
import classes from "./index.module.css";
import HeaderLink from "./HeaderLink";
import LayoutHeading from "./LayoutHeading";
import Link from "next/link";

interface HeaderProps {
  links: { href: string; text: string }[];
  accountComponent: ReactNode;
  headingText: string[];
  headingHref: string;
}

const Header: FunctionComponent<HeaderProps> = ({
  links,
  accountComponent,
  headingText,
  headingHref,
}) => {
  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.links}>
          {links.map((link) => (
            <li>
              <HeaderLink href={link.href} text={link.text} />
            </li>
          ))}
        </ul>
      </nav>
      <Link href={headingHref}>
        <LayoutHeading
          firstHalf={headingText[0]}
          seceondHalf={headingText[1]}
        />
      </Link>
      {accountComponent}
    </header>
  );
};

export default Header;
