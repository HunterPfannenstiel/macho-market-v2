import { Selections } from "@_types/index";
import { UserToken } from "@_types/machoverse";
import { useRef, useState } from "react";

const useHandleTokens = () => {
  const [currentTokens, setCurrentTokens] = useState<UserToken[]>([]);
  const [selectedTokens, setSelectedTokens] = useState<Selections>({});
  const selectedTokenValues = useRef<{ [id: number]: number }>({});

  const updateTokenValues = () => {
    setCurrentTokens((prevState) => {
      const newTokens = prevState.map((token) => {
        return { ...token };
      });
      for (let i = 0; i < newTokens.length; i++) {
        const updateAmount = selectedTokenValues.current[newTokens[i].tokenId];
        if (updateAmount) {
          newTokens[i].amount -= updateAmount;
        }
      }
      return newTokens;
    });
    setSelectedTokens({});
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
    return currentTokens.filter((token) => selectedTokens[token.tokenId]);
  };

  return {
    currentTokens,
    selectedTokens,
    selectedTokenValues: selectedTokenValues.current,
    updateTokenValues,
    updateSelectedTokenValue,
    getSelectedTokenData,
    updateSelectedToken,
    initializeTokens: setCurrentTokens,
  };
};

export default useHandleTokens;
