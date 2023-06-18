import { FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import Modal from "../Reusable/Modal";
import useAnimateModal from "@_hooks/animation/useAnimateModal";
import CurrencyList from "../Reusable/Token/Currency/CurrencyList";
import useCurrencies from "@_hooks/useCurrencies";
import useFaucet from "@_hooks/contracts/useFaucet";
import { ContractTransaction } from "ethers";

interface FaucetModalProps {}

const FaucetModal: FunctionComponent<FaucetModalProps> = () => {
  const currencies = useCurrencies();
  const { toggle, showModal, playAnimation } = useAnimateModal();
  const faucetContract = useFaucet();
  const selectedCurrency = useRef(1);
  const onSelectedCurrency = (currencyId: number) => {
    selectedCurrency.current = currencyId;
  };
  const dripFaucet = async () => {
    console.log(faucetContract);
    if (faucetContract) {
      try {
        let tx: Promise<ContractTransaction> | null = null; //prompts the user and resolves when the user submits the transaction
        if (selectedCurrency.current === 1) {
          tx = faucetContract.mintMachoUSD();
        } else if (selectedCurrency.current === 2) {
          tx = faucetContract.mintMachoMagic();
        } else if (selectedCurrency.current === 3) {
          tx = faucetContract.mintMachoCoin(1);
        } else {
          console.log(
            `Currency Id: [${selectedCurrency.current}] is not supported`
          );
        }
        if (tx) {
          console.log("Awaiting tx", tx);
          await tx;
          console.log("Done!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  if (showModal) {
    return (
      <Modal
        animationTime={300}
        handleModal={toggle}
        playAnimation={playAnimation}
        className={classes.container}
      >
        <h2>Need Tokens?</h2>
        <h2>Get some from the faucet!</h2>
        <CurrencyList
          currencies={currencies}
          selectedHandler={onSelectedCurrency}
          initialSelectedCurrency={1}
        />
        <button onClick={dripFaucet}>Mint the token!</button>
      </Modal>
    );
  }
  return <button onClick={toggle}>Use Faucet</button>;
};

export default FaucetModal;
