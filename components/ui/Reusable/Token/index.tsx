import { CSSProperties, FunctionComponent } from "react";
import { CSSToken } from "@_types/token";
import Image from "next/image";
import classes from "./index.module.css";

type TokenProps = {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  blur?: boolean;
  selected?: boolean;
} & CSSToken;

const Token: FunctionComponent<TokenProps> = ({
  image,
  diameter,
  thickness,
  borderColor,
  fillColor,
  lineWidth,
  lineSpace,
  blur,
  selected,
  onClick,
}) => {
  const style = {
    "--diameter": diameter,
    "--thickness": thickness,
    "--border-color": `${borderColor}`,
    "--fill-color": `${fillColor}`,
    "--line-width": lineWidth,
    "--line-spacing": lineSpace,
  } as CSSProperties;

  let coinClassName;
  if (!blur && !selected) {
    coinClassName = classes.oval_container;
  } else if (blur) {
    coinClassName = `${classes.oval_container} ${classes.blur}`;
  } else {
    coinClassName = `${classes.oval_container} ${classes.selected}`;
  }

  return (
    <button className={coinClassName} style={style} onClick={onClick}>
      <div className={classes.oval}>
        <div className={classes.image_container}>
          <Image
            src={image || "/Images/Loading.png"}
            placeholder={"blur"}
            blurDataURL={"/Images/Loading.png"}
            alt="NFT Image"
            className={classes.image}
            fill
            sizes="200px"
          />
        </div>
      </div>
      <div className={classes.oval}></div>
      <div className={classes.clip}></div>
    </button>
  );
};

export default Token;
