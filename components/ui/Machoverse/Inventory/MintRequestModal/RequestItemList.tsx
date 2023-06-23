import { FunctionComponent } from "react";
import classes from "./RequestItemList.module.css";
import { UserToken } from "@_types/machoverse";
import RequestItem from "./RequestItem";
import useTokenMetadata from "@_hooks/machoverse/useTokenMetadata";

interface RequestItemListProps {
  tokens: UserToken[];
  updateTokenValue?: (id: number, value: number) => void;
  showNumberInput?: boolean;
}

const RequestItemList: FunctionComponent<RequestItemListProps> = ({
  tokens,
  updateTokenValue,
  showNumberInput,
}) => {
  const { metadata } = useTokenMetadata();
  if (!metadata) return <p>Loading...</p>;
  return (
    <ul>
      {tokens.map((token) => {
        return (
          <RequestItem
            showNumberInput={showNumberInput}
            userToken={token}
            token={metadata[token.tokenId]}
            onValueChange={updateTokenValue}
            key={token.tokenId}
          />
        );
      })}
    </ul>
  );
};

export default RequestItemList;
