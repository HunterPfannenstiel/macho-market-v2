import {
  FunctionComponent,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import {
  createAccount,
  credentialsLogin,
  ethereumLogin,
  getInitialContext,
  getInitialSession,
  logoutUser,
} from "./utils";
import { authenticateWallet } from "@_utils/web3/auth";

const Account = createContext(getInitialContext());

interface AccountProviderProps {
  children: ReactNode;
}

const AccountProvider: FunctionComponent<AccountProviderProps> = ({
  children,
}) => {
  const [sessionInfo, setSessionInfo] = useState(getInitialSession());

  const loginWithCredentials = async (userName: string, password: string) => {
    const sessionDetails = await credentialsLogin(userName, password);
    if (sessionDetails) setSessionInfo(sessionDetails);
    else return "Error Logging In";
  };

  const loginWithEthereum = async () => {
    const session = await ethereumLogin();
    setSessionInfo(session);
  };

  const logout = () => {
    logoutUser();
    setSessionInfo({ ...getInitialSession(), isSignedIn: false });
  };

  const signup = async (
    userName: string,
    password: string,
    confirmPassword: string
  ) => {
    const sessionDetails = await createAccount(
      userName,
      password,
      confirmPassword
    );
    if (sessionDetails) setSessionInfo(sessionDetails);
  };

  const link = async () => {
    const res = await authenticateWallet(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/wallet-link`
    );
    if (res.address)
      setSessionInfo((prevState) => {
        return { ...prevState, address: res.address };
      });
  };
  return (
    <Account.Provider
      value={{
        ...sessionInfo,
        initializeSession: setSessionInfo,
        loginWithCredentials,
        loginWithEthereum,
        logout,
        signup,
        link,
      }}
    >
      {children}
    </Account.Provider>
  );
};

export default AccountProvider;

export const useMachoAccount = () => useContext(Account);
