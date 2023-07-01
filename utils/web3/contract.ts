import { MachoverseContract } from "@_types/machoverse/MachoverseContract";
import { MarketAPI } from "custom-objects/Fetch/API";
import { BrowserProvider, ethers } from "ethers";

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID_NUM;

export const loadContract = async (name: string, provider: BrowserProvider) => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined!");
  }
  const {
    data: Artifact,
    errorMessage,
    success,
  } = await MarketAPI.Get<any>(`/contracts/${name}.json`);
  if (!success) {
    return Promise.reject(errorMessage);
  }
  if (Artifact?.networks[NETWORK_ID]?.address) {
    const contract = new ethers.Contract(
      Artifact.networks[NETWORK_ID].address,
      Artifact.abi,
      provider
    );
    return contract;
  } else {
    return Promise.reject(
      `Contract: [${name}] has not been deployed to Network: [${NETWORK_ID}]`
    );
  }
};

export const loadMachoverse = async (provider: BrowserProvider) => {
  const contract = await loadContract("Machoverse", provider);
  const signer = await provider.getSigner();
  const signedContract = contract.connect(
    signer
  ) as unknown as MachoverseContract;
  return signedContract;
};
