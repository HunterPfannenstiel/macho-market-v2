import { FunctionComponent } from "react";
import classes from "./RequestItemList.module.css";
import { MachoToken } from "@_types/machoverse";
import RequestItem from "./RequestItem";

interface RequestItemListProps {
  tokens: MachoToken[];
  updateTokenValue: (id: number, value: number) => void;
}

const RequestItemList: FunctionComponent<RequestItemListProps> = ({
  tokens,
  updateTokenValue,
}) => {
  return (
    <ul>
      {tokens.map((token) => {
        return (
          <RequestItem
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
