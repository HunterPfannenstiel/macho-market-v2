"use client";

import { useEffect, useState } from "react";

const useAccount = () => {
  const [account, setAccount] = useState(window?.ethereum?.selectedAddress);
  const handleAccountsChanged = async (...args: any[]) => {
    const accounts = args[0] as string[];
    const unlocked = await window.ethereum._metamask.isUnlocked();
    if (!unlocked) location.reload();
    if (accounts.length === 0) {
      console.log("Account disconnected");
    } else if (accounts[0] !== account) {
      console.log("Account Found");
      setAccount(accounts[0]);
    }
  };

  useEffect(() => {
    window?.ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      window?.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  }, []);

  return account;
};

export default useAccount;

export const connectMetaMask = () => {
  try {
    window.ethereum?.request({ method: "eth_requestAccounts" });
  } catch (error) {
    console.log(error);
  }
};
