"use client";

import { FunctionComponent } from "react";
import classes from "./index.module.css";
import LoginForm from "./LoginForm";
import Button from "components/ui/Reusable/Buttons/Button";
import CreateAccountForm from "./CreateAccountForm";
import { useMachoAccount } from "@_providers/Machoverse/Account";

interface LoginProps {}

const Login: FunctionComponent<LoginProps> = () => {
  const mA = useMachoAccount();
  return (
    <section className={classes.login}>
      <p>Welcome!</p>
      <section className={classes.login_section}>
        <h2>Already have an account? Login!</h2>
        <LoginForm onLogin={mA.loginWithCredentials} />
        <p>OR</p>
        <Button onClick={mA.loginWithEthereum}>Sign-in With Ethereum!</Button>
      </section>
      <CreateAccountForm onCreateAccount={mA.signup} />
      <Button onClick={mA.logout}>Log out</Button>
      <Button onClick={mA.link}>Link</Button>
    </section>
  );
};

export default Login;
