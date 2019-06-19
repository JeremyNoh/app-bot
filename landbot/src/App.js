import React, { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import Chat from "./components/Chat";
import GenderContext from "./hooks/context";

function App() {
  // All useState Definition

  // Boolean : Check is User Connect
  const [isAuth, setIsAuth] = useState(false);

  // Object : Info of the User
  const [user, setUSer] = useState({ name: undefined, gender: "Femme" });

  if (isAuth) {
    return <Chat user={user} />;
  }
  return (
    <GenderContext.Provider value={{ user, setUSer }}>
      <Login isAuthFn={setIsAuth} setUSer={setUSer} />
    </GenderContext.Provider>
  );
}

export default App;
