import { FormEvent, FunctionComponent, useRef } from "react";
import classes from "./index.module.css";
import TextInput from "components/ui/Reusable/Form/TextInput";
import FormLayout from "components/ui/Reusable/Form/FormLayout";

interface CreateAccountFormProps {}

const CreateAccountForm: FunctionComponent<CreateAccountFormProps> = () => {
  const userName = useRef("");
  const password = useRef("");
  const retypePw = useRef("");

  const onCreateAccount = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/database/create-account`,
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
  };
  return (
    <FormLayout onSubmit={onCreateAccount} buttonText="Create Account">
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
          retypePw.current = pw;
        }}
        id={"retype"}
        type="password"
      />
    </FormLayout>
  );
};

export default CreateAccountForm;
