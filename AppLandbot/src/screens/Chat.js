import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import { uuidv4 } from "../func";
import bot from "../../assets/bot.png";

// Libs Extenal
import { GiftedChat } from "react-native-gifted-chat";

export default function Chat(props) {
  const [messageList, setMessageList] = useState([]);
  const [firstInApp, setFirstInApp] = useState(true);
  const [isMessageSend, setIsMessageSend] = useState(undefined);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      let obj = {
        _id: 1,
        text: `Bonjour ${props.user.name}, \n en quoi puis-je t'aider ? 🤗`,
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
      let obj = {
        _id: uuidv4(),
        text: "Débrouilles toi !!",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "BotLand",
          avatar: bot
        }
      };
      setMessageList([...messageList, obj]);
      setIsMessageSend(undefined);
    }
  });
  return (
    <GiftedChat
      messages={messageList}
      onSend={messages => {
        console.log(messages);
        setMessageList([...messageList, ...messages]);
        setIsMessageSend(...messages);
      }}
      inverted={false}
      user={{
        _id: 1
      }}
    />
  );
}
