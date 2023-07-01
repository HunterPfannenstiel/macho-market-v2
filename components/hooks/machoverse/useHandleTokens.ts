import { Selections } from "@_types/index";
import { UserToken } from "@_types/machoverse";
import { useRef, useState } from "react";
import useUpdateTokens, { SuccessDelegate } from "./inventory/useUpdateTokens";

const useHandleTokens = (
  dbToBlockDelegate: SuccessDelegate,
  blockToDBDelegate: () => void
) => {
  const [selectedTokens, setSelectedTokens] = useState<Selections>({});
  const selectedTokenValues = useRef<{ [id: number]: number }>({});
  const { tokens, removeFromTokenState, tokenLocation } = useUpdateTokens(
    dbToBlockDelegate,
    blockToDBDelegate,
    setSelectedTokens.bind(null, {})
  );

  const updateTokenValues = (updateTokens: UserToken[]) => {
    removeFromTokenState(updateTokens);
    selectedTokenValues.current = {};
  };

  const updateSelectedTokenValue = (id: number, value: number) => {
    selectedTokenValues.current[id] = value;
  };

  const updateSelectedToken = (id: number) => {
    setSelectedTokens((prevState) => {
      const copy = { ...prevState };
      if (copy[id]) delete copy[id];
      else copy[id] = true;
      return copy;
    });
  };

  const getSelectedTokenData = () => {
    if (!tokens) {
      console.log("Tokens undefined");
      return [];
    }
    return tokens.filter((token) => selectedTokens[token.tokenId]);
  };

  return {
    currentTokens: tokens || [],
    selectedTokens,
    selectedTokenValues: selectedTokenValues.current,
    updateTokenValues,
    updateSelectedTokenValue,
    getSelectedTokenData,
    updateSelectedToken,
    tokenLocation,
  };
};

export default useHandleTokens;
