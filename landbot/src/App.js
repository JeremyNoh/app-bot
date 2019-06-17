import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUSer] = useState({ name: undefined, gender: false });

  if (isAuth) {
    return <Chat user={user} />;
  }
  return <Login isAuthFn={setIsAuth} setUSer={setUSer} />;
}

export default App;
