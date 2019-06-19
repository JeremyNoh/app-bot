import React, { useState } from "react";
import {
  TextInput,
  Button,
  Pane,
  Text,
  TabNavigation,
  Tab
} from "evergreen-ui";
import useInput from "../hooks/useInput";

// tabs for Gender
export const tabGender = ["Femme", "Homme"];

export default function App(props) {
  // All useState Definition

  // input Name Value
  const username = useInput();

  // Index of the tabGender Selection
  const [indexGender, setIndexGender] = useState(0);

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
        <h1> 🤖 Cocktail 🤖</h1>

        <Text>Username : </Text>
        <TextInput
          label="A controlled text input field"
          required
          description="This is a description."
          {...username}
        />
        <br />

        <TabNavigation>
          {tabGender.map((tab, index) => (
            <Tab
              key={tab}
              id={tab}
              onSelect={() => {
                setIndexGender(index);
              }}
              isSelected={index === indexGender}
            >
              {tab}
            </Tab>
          ))}
        </TabNavigation>
        <br />
        <Button
          disabled={!username}
          marginRight={16}
          appearance="primary"
          intent="success"
          onClick={() => {
            props.setUSer({
              name: username.value,
              gender: tabGender[indexGender]
            });
            props.isAuthFn(true);
          }}
        >
          Submit
        </Button>
      </Pane>
    </div>
  );
}
