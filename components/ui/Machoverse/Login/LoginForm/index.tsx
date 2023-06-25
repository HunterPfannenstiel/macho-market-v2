import { FormEvent, FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import TextInput from "components/ui/Reusable/Form/TextInput";
import FormLayout from "components/ui/Reusable/Form/FormLayout";

interface LoginFormProps {
  onLogin: (userName: string, password: string) => void;
}

const LoginForm: FunctionComponent<LoginFormProps> = ({ onLogin }) => {
  const userName = useRef("");
  const password = useRef("");
  return (
    <FormLayout
      onSubmit={(e) => {
        e.preventDefault();
        onLogin(userName.current, password.current);
      }}
      buttonText="Log In"
    >
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
        type="password"
      />
    </FormLayout>
  );
};

export default LoginForm;
