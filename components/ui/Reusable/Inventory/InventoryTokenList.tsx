import { FunctionComponent } from "react";
import classes from "./InventoryTokenList.module.css";
import { MachoToken } from "@_types/machoverse";
import InventoryToken from "./InventoryToken";
import { Selections } from "@_types/index";

interface InventoryTokenListProps {
  tokens: MachoToken[];
  onTokenClicked: (id: number) => void;
  selectedTokenIds?: Selections;
}

const InventoryTokenList: FunctionComponent<InventoryTokenListProps> = ({
  tokens,
  onTokenClicked,
  selectedTokenIds,
}) => {
  return (
    <ul className={classes.tokens}>
      {tokens.map((token) => {
        const selected = !!(
          selectedTokenIds && selectedTokenIds[token.tokenId]
        );
        return (
          <InventoryToken
            token={token}
            isSelected={selected}
            onClickHandler={onTokenClicked}
          />
        );
      })}
    </ul>
  );
};

export default InventoryTokenList;
