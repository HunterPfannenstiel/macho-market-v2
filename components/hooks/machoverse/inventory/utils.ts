import { UserToken } from "@_types/machoverse";
import { loadMachoverse } from "@_utils/web3/contract";
import { createMintRequest } from "@_utils/web3/mint-request";
import { BrowserProvider } from "ethers";

export type UpdateTokens = {
  tokenLocation: string;
  tokens: UserToken[];
  provider?: BrowserProvider | null;
};

export const updateTokens = async ({
  tokenLocation,
  tokens,
  provider,
}: UpdateTokens) => {
  if (tokenLocation === "game") {
    return createMintRequest("Mint", tokens);
  } else if (tokenLocation === "blockchain") {
    console.log("block chain");
    if (!provider) {
      throw new Error("Please connect wallet before minting to the game.");
    }
    const machoverse = await loadMachoverse(provider);
    const ids: number[] = [];
    const amounts: number[] = [];
    tokens.forEach((token) => {
      ids.push(token.tokenId);
      amounts.push(token.amount);
    });
    await machoverse.mintToGame(ids, amounts);
  }
};
