import React, { useState, useEffect } from "react";

import { Launcher } from "react-chat-window";
import botImage from "../assets/bot.png";
import { responseBOT } from "../api";

import { Badge } from "evergreen-ui";

export default function Chat(props) {
  // All useState Definition

  // list of the Conversation .. maybe Stock in AsyncStorage :P
  const [messageList, setMessageList] = useState([]);

  // when user connect First in App
  const [firstInApp, setFirstInApp] = useState(true);

  // just for the Notification Badge
  const [countMessage, setCountMessage] = useState(1);

  // trigger for Bot Reponse
  const [isMessageSend, setIsMessageSend] = useState(undefined);

  // info of One Drink | Cocktail
  const [drink, setDrink] = useState(undefined);

  useEffect(() => {
    //   ComponentDidMount
    if (firstInApp) {
      let obj = {
        author: "bot",
        type: "text",
        data: {
          text: `Bonjour ${
            props.user.name
          }, \n tape : \n help ou aide \npour en savoir plus   🤗`
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
            author: "bot",
            type: "text",
            data: {
              text: value.result
            }
          };

          if (value.hasOwnProperty("drink")) {
            setDrink(value.drink);
          }
          setMessageList([...messageList, obj]);
        })
        .catch(err => console.log(err));
      setIsMessageSend(undefined);
    }
  });

  return (
    <div className="App">
      <header className="App-header">
        {drink === undefined && (
          <>
            <p>
              Bienvenue <code>{props.user.name}</code> !{" "}
            </p>
            <p>
              Commence la discution avec le Bot tu retrouveras içi toutes les
              infos pour préparer ton Cocktail
            </p>
          </>
        )}

        {drink && (
          <>
            <p>
              <code> {drink.strDrink}</code>
            </p>
            <p>
              {drink.ingredients &&
                drink.ingredients.map((ingredient, index) => {
                  return (
                    <Badge key={index} color="purple" isSolid marginRight={8}>
                      {ingredient}
                    </Badge>
                  );
                })}
            </p>
            <br />
            <img src={drink.strDrinkThumb} className="App-logo" alt="logo" />
            <p>{drink.strInstructions}</p>
          </>
        )}

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
