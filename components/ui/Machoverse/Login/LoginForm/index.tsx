import { FormEvent, FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import TextInput from "components/ui/Reusable/Form/TextInput";
import FormLayout from "components/ui/Reusable/Form/FormLayout";

interface LoginFormProps {}

const LoginForm: FunctionComponent<LoginFormProps> = () => {
  const userName = useRef("");
  const password = useRef("");

  const onLogin = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/login`,
      {
        method: "POST",
        body: JSON.stringify({
          userName: userName.current,
          password: password.current,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      console.error("Error logging in!");
      return;
    } else {
      console.log("Success! Redirect");
    }
  };
  return (
    <FormLayout onSubmit={onLogin} buttonText="Log In">
      <TextInput
        label="User Name"
        onInputChange={(name) => {
          userName.current = name;
        }}
      />
      <TextInput
        label="Password"
        onInputChange={(pw) => {
          password.current = pw;
        }}
      />
    </FormLayout>
  );
};

export default LoginForm;
