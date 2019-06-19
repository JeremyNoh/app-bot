import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";

import { uuidv4 } from "../func";
import bot from "../../assets/bot.png";
import { responseBOT } from "../api";

// Libs Extenal
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat(props) {
  // All useState Definition

  // list of the Conversation .. maybe Stock in AsyncStorage :P
  const [messageList, setMessageList] = useState([]);

  // when user connect First in App
  const [firstInApp, setFirstInApp] = useState(true);

  // trigger for Bot Reponse
  const [isMessageSend, setIsMessageSend] = useState(undefined);

  // info of One Drink | Cocktail
  const [drink, setDrink] = useState(undefined);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      let obj = {
        _id: 1,
        text: `Bonjour ${
          props.user.name
        }, \n tape : \n help ou aide \npour en savoir plus 🤗`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "BotLand",
          avatar: bot
        }
      };
      setMessageList([...messageList, obj]);
      setFirstInApp(false);
    }
    // when the User Send a Message
    if (isMessageSend) {
      const toto = responseBOT(isMessageSend)
        .then(value => {
          let obj = {
            _id: uuidv4(),
            text: value.result,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: "BotLand",
              avatar: bot
            }
          };
          if (value.hasOwnProperty("drink")) {
            obj.image = value.drink.strDrinkThumb;
            obj.text =
              value.result + "\n composé  de : " + value.drink.ingredients;
            setDrink(value.drink);
          }
          setMessageList([...messageList, obj]);
        })
        .catch(err => console.log(err));
      setIsMessageSend(undefined);
    }
  });
  return (
    <GiftedChat
      messages={messageList}
      onSend={messages => {
        setMessageList([...messageList, ...messages]);
        setIsMessageSend(messages[0].text);
      }}
      inverted={false}
      user={{
        _id: 1
      }}
    />
  );
}
