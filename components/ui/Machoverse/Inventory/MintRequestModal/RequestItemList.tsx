import { FunctionComponent } from "react";
import classes from "./RequestItemList.module.css";
import { MachoToken } from "@_types/machoverse";
import RequestItem from "./RequestItem";

interface RequestItemListProps {
  tokens: MachoToken[];
  updateTokenValue?: (id: number, value: number) => void;
  showNumberInput?: boolean;
}

const RequestItemList: FunctionComponent<RequestItemListProps> = ({
  tokens,
  updateTokenValue,
  showNumberInput,
}) => {
  return (
    <ul>
      {tokens.map((token) => {
        return (
          <RequestItem
            showNumberInput={showNumberInput}
            token={token}
            onValueChange={updateTokenValue}
            key={token.tokenId}
          />
        );
      })}
    </ul>
  );
};

export default RequestItemList;
