import { FunctionComponent } from "react";
import classes from "./LoginPage.module.css";
import Login from "components/ui/Account/Login";

interface LoginPageProps {}

const LoginPage: FunctionComponent<LoginPageProps> = () => {
  return <Login></Login>;
};

export default LoginPage;
