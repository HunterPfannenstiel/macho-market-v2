import { BrowserProvider, ethers } from "ethers";

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, provider: BrowserProvider) => {
  if (!NETWORK_ID) {
    return Promise.reject("Network ID is not defined!");
  }
  const abi = await fetch(`/contracts/${name}.json`);
  const Artifact = await abi.json();
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
