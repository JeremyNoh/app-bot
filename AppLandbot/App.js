import React, { useState } from "react";
import Login from "./src/screens/Login";
import Chat from "./src/screens/Chat";

export default function App() {
  // All useState Definition

  // Boolean : Check is User Connect
  const [isAuth, setIsAuth] = useState(false);

  // Object : Info of the User
  const [user, setUSer] = useState({ name: undefined, gender: "Femme" });
  if (isAuth) {
    return <Chat user={user} />;
  }

  return <Login isAuthFn={setIsAuth} setUSer={setUSer} />;
}
