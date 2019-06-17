import React, { useState, useEffect } from "react";
import { toaster } from "evergreen-ui";
import logo from "../logo.svg";

import botsvg from "../assets/botsvg.svg";

import "./botcss.css";

import { Launcher } from "react-chat-window";
import botImage from "../assets/bot.png";

async function fetchInfo(stringUser) {
  const response = await fetch("http://localhost:5000/api/game", {
    headers: {
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify(stringUser)
  });

  const json = await response.json();

  if (json.data) {
    toaster.info("Tu as reçu un nouveau message", {
      duration: 3
    });
  } else {
    toaster.danger(`Une erreur est survenue`, {
      duration: 5
    });
  }
}
export default function Chat(props) {
  const [messageList, setMessageList] = useState([]);
  const [firstInApp, setFirstInApp] = useState(true);
  const [countMessage, setCountMessage] = useState(1);
  const [isMessageSend, setIsMessageSend] = useState(undefined);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      let obj = {
        author: "bot",
        type: "text",
        data: {
          text: `Bonjour ${props.user.name}, \n en quoi puis-je t'aider ? 🤗`
        }
      };
      setMessageList([...messageList, obj]);
      setFirstInApp(false);
    }

    // when the User Send a Message
    if (isMessageSend) {
      console.log(isMessageSend);
      let obj = {
        author: "bot",
        type: "text",
        data: {
          text: "Débrouilles toi !!"
        }
      };
      setMessageList([...messageList, obj]);
      setIsMessageSend(undefined);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <div className="robot">
          <img src={botsvg} />
        </div> */}
        <p>
          Bienvenue <code>{props.user.name}</code> !{" "}
        </p>
        <p>Commence la discution avec ce Bot concernant les jeux.</p>
        <Launcher
          agentProfile={{
            teamName: `Bienvenue ${props.user.name}`,
            imageUrl: botImage
          }}
          newMessagesCount={countMessage}
          onMessageWasSent={message => {
            setMessageList([...messageList, message]);
            countMessage - 1 < 0
              ? setCountMessage(countMessage)
              : setCountMessage(countMessage - 1);
            setIsMessageSend(message.data.text);
          }}
          messageList={messageList}
          showEmoji
        />
      </header>
    </div>
  );
}
