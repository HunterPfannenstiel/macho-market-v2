import { FunctionComponent } from "react";
import classes from "./InventoryTokenList.module.css";
import { MachoToken, UserToken } from "@_types/machoverse";
import InventoryToken from "./InventoryToken";
import { Selections } from "@_types/index";
import useTokenMetadata from "@_hooks/machoverse/useTokenMetadata";

interface InventoryTokenListProps {
  tokens: UserToken[];
  onTokenClicked: (id: number) => void;
  selectedTokenIds?: Selections;
}

const InventoryTokenList: FunctionComponent<InventoryTokenListProps> = ({
  tokens,
  onTokenClicked,
  selectedTokenIds,
}) => {
  const { metadata } = useTokenMetadata();
  if (!metadata) return <p>Loading...</p>;
  return (
    <ul className={classes.tokens}>
      {tokens.map((token) => {
        const selected = !!(
          selectedTokenIds && selectedTokenIds[token.tokenId]
        );
        return (
          <InventoryToken
            userToken={token}
            token={metadata[token.tokenId]}
            isSelected={selected}
            onClickHandler={onTokenClicked}
          />
        );
      })}
    </ul>
  );
};

export default InventoryTokenList;
