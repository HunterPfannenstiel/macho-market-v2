import { CSSProperties, FunctionComponent } from "react";
import classes from "./index.module.css";

interface TooltipProps {
  name: string;
  open: boolean;
  link?: string;
  openDirection?: "Up" | "Down" | "Left" | "Right";
  containerOffset?: string;
}

const Tooltip: FunctionComponent<TooltipProps> = ({
  name,
  open,
  link,
  openDirection,
  containerOffset,
}) => {
  const className = open
    ? `${classes.tooltip} ${classes.open}`
    : classes.tooltip;
  return (
    <div
      className={className}
      style={getTooltipPostition(openDirection, containerOffset || "-75%")}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        {name}
      </a>
    </div>
  );
};

const getTooltipPostition = (
  direction: "Up" | "Down" | "Left" | "Right" = "Up",
  offset: string
) => {
  let css = {} as CSSProperties;
  if (direction === "Up" || direction === "Down") {
    const dir = direction === "Up" ? "top" : "bottom";
    css = { left: "50%", [dir]: offset, transform: "translateX(-50%)" };
  } else {
    const dir = direction === "Left" ? "left" : "right";
    css = { top: "50%", [dir]: offset, transform: "translateY(-80%)" };
  }
  return css;
};

export default Tooltip;
