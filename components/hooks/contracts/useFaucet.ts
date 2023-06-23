import { useMetaMask } from "@_providers/Metamask";
import { MachoFaucetContract } from "@_types/MachoFaucetContract";
import { loadContract } from "@_utils/web3/contract";
import { useEffect, useState } from "react";

const useFaucet = () => {
  const { provider } = useMetaMask();
  const [contract, setContract] = useState<MachoFaucetContract>();
  useEffect(() => {
    // if (provider) {
    //   const getContract = async () => {
    //     const contract = await loadContract("MachoFaucet", provider);
    //     const signer = await provider.getSigner();
    //     const signedContract = contract.connect(signer);
    //     setContract(signedContract as unknown as MachoFaucetContract);
    //   };
    //   getContract();
    // }
  }, [provider]);

  return contract;
};

export default useFaucet;
