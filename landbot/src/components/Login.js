import React from "react";
import { TextInput, Button, Pane, Text } from "evergreen-ui";
import useInput from "../hooks/useInput";

export default function App(props) {
  const username = useInput();
  const password = useInput();

  return (
    <div className="AppContent">
      <Pane
        elevation={0}
        width={400}
        height={500}
        background="tint2"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <h1> Login</h1>

        <Text>Username : </Text>
        <TextInput
          label="A controlled text input field"
          required
          description="This is a description."
          {...username}
        />
        <br />

        {/* <Text>Password :</Text>
        <TextInput
          label="A controlled text input field"
          required
          description="This is a description."
          value={password}
          type="password"
          {...password}
        /> */}
        <br />
        <Button
          disabled={!username || !password}
          marginRight={16}
          appearance="primary"
          intent="success"
          onClick={() => {
            props.setUSer({ name: username.value, gender: false });
            props.isAuthFn(true);
          }}
        >
          Submit
        </Button>
      </Pane>
    </div>
  );
}
