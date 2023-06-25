import { FormEvent, FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import TextInput from "components/ui/Reusable/Form/TextInput";
import FormLayout from "components/ui/Reusable/Form/FormLayout";

interface CreateAccountFormProps {
  onCreateAccount: (
    userName: string,
    password: string,
    confirmPassword: string
  ) => void;
}

const CreateAccountForm: FunctionComponent<CreateAccountFormProps> = ({
  onCreateAccount,
}) => {
  const userName = useRef("");
  const password = useRef("");
  const confirmPassword = useRef("");
  return (
    <FormLayout
      onSubmit={(e) => {
        e.preventDefault();
        onCreateAccount(
          userName.current,
          password.current,
          confirmPassword.current
        );
      }}
      buttonText="Create Account"
    >
      <TextInput
        label="User Name"
        onInputChange={(name) => {
          userName.current = name;
        }}
        id={"new-username"}
      />
      <TextInput
        label="Password"
        onInputChange={(pw) => {
          password.current = pw;
        }}
        id={"new-password"}
        type="password"
      />
      <TextInput
        label="Retype Password"
        onInputChange={(pw) => {
          confirmPassword.current = pw;
        }}
        id={"retype"}
        type="password"
      />
    </FormLayout>
  );
};

export default CreateAccountForm;
