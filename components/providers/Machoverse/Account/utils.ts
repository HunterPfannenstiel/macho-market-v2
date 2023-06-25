import { SessionDetails } from "@_types/machoverse";
import { authenticateWallet } from "@_utils/web3/auth";

type AccountContext = {
  loginWithCredentials: (userName: string, password: string) => void;
  loginWithEthereum: () => void;
  logout: () => void;
  signup: (userName: string, password: string, confirmPassword: string) => void;
  link: () => void;
  initializeSession: (details: SessionDetails) => void;
} & SessionDetails;

export const getInitialContext = (): AccountContext => {
  const anon = () => {};
  return {
    isSignedIn: undefined,
    userName: undefined,
    sessionExpiry: undefined,
    address: undefined,
    loginWithCredentials: () => {},
    loginWithEthereum: anon,
    logout: anon,
    signup: anon,
    link: anon,
    initializeSession: anon,
  };
};

export const getInitialSession = (): SessionDetails => {
  return {
    isSignedIn: undefined,
    userName: undefined,
    sessionExpiry: undefined,
    address: undefined,
  };
};

export const credentialsLogin = async (userName: string, password: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/login`,
    {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    }
  );
  const data = await res.json();
  if (!res.ok) {
    console.error(data);
    return;
  }
  return {
    userName,
    ...data,
  } as SessionDetails;
};

export const createAccount = async (
  userName: string,
  password: string,
  confirmPassword: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/signup`,
    {
      method: "POST",
      body: JSON.stringify({ userName, password, confirmPassword }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }
  );
  const data = await res.json();
  if (!res.ok) {
    console.error(data);
    return;
  }
  return { userName, ...data, address: undefined } as SessionDetails;
};

export const logoutUser = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/logout`,
    {
      method: "POST",
      credentials: "include",
    }
  );
};

export const ethereumLogin = async (): Promise<SessionDetails> => {
  return await authenticateWallet(
    `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/login-ethereum`
  );
};
