"use client";

import { FunctionComponent } from "react";
import classes from "./Login.module.css";
import { authenticateWallet } from "@_utils/web3/auth";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const onEthereumSignIn = async () => {
    const res = await authenticateWallet(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/login-ethereum`
    );
  };
  return (
    <div>
      <div>
        <h2>Sign-in with ethereum!</h2>
        <button onClick={onEthereumSignIn}>Sign-in</button>
      </div>
      <div>
        <h2>Sign-in with Username and Password</h2>
        <form>
          <input type="text" />
          <input type="text" />
        </form>
      </div>
    </div>
  );
};

export default Login;
