export type WalletStateContext = {
  checkWalletState: () => Promise<boolean>;
};

export const getInitialContext = (): WalletStateContext => {
  return {
    checkWalletState: async () => false,
  };
};
