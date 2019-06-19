import React, { useState } from "react";

import { View, StyleSheet, TextInput } from "react-native";

// Component
import Container from "../components/Container";
import useInput from "../hooks/useInput";

import { Button, ButtonGroup, Header } from "react-native-elements";
import {
  BUTTON_COLOR_ONE,
  COLOR_TEXT,
  BACKGROUND_BODY
} from "../../assets/colors";

// tabs for Gender
export const Gender = ["Femme", "Homme"];

export default function Login(props) {
  // All useState Definition

  // input Name Value
  const username = useInput();

  // Index of the tabGender Selection
  const [indexGender, setIndexGender] = useState(0);

  return (
    <>
      <Header
        backgroundColor="#282c34"
        centerComponent={{
          text: `Home`,
          style: { color: "#fff", fontWeight: "bold", fontSize: 20 }
        }}
      />

      <Container>
        <View>
          <TextInput
            style={styles.TextInput}
            placeholderTextColor={BUTTON_COLOR_ONE}
            {...username}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <ButtonGroup
            onPress={val => setIndexGender(val)}
            selectedIndex={indexGender}
            buttons={Gender}
            containerStyle={{
              height: 30,
              marginTop: 50,
              borderRadius: 5,
              backgroundColor: BACKGROUND_BODY,
              borderColor: BUTTON_COLOR_ONE
            }}
            selectedButtonStyle={[
              {
                backgroundColor: BUTTON_COLOR_ONE
              }
            ]}
            selectedTextStyle={{
              color: BACKGROUND_BODY
            }}
          />

          <Button
            buttonStyle={styles.Button}
            title="Se connecter"
            onPress={() => {
              props.setUSer({
                name: username.value,
                gender: Gender[indexGender]
              });
              props.isAuthFn(true);
            }}
          />
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    alignItems: "center",
    height: 40,
    marginVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: BUTTON_COLOR_ONE,
    color: COLOR_TEXT,
    width: 300
  },
  Button: {
    height: 50,
    backgroundColor: BUTTON_COLOR_ONE,
    marginBottom: 10,
    marginTop: 90,
    borderRadius: 5
  },
  desabled: {
    height: 50,
    backgroundColor: BACKGROUND_BODY,
    borderWidth: 1,
    borderColor: BUTTON_COLOR_ONE,
    borderRadius: 5
  }
});
