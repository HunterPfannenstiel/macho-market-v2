"use client";

import { FunctionComponent } from "react";
import classes from "./index.module.css";
import LoginForm from "./LoginForm";
import Button from "components/ui/Reusable/Buttons/Button";
import { authenticateWallet } from "@_utils/web3/auth";
import CreateAccountForm from "./CreateAccountForm";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const onEthereumClick = async () => {
    const res = await authenticateWallet(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/web/login-ethereum`
    );
  };
  return (
    <section className={classes.login}>
      <p>Welcome!</p>
      <section className={classes.login_section}>
        <h2>Already have an account? Login!</h2>
        <LoginForm />
        <p>OR</p>
        <Button onClick={onEthereumClick}>Sign-in With Ethereum!</Button>
      </section>
      <CreateAccountForm />
    </section>
  );
};

export default Login;
