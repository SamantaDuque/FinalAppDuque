// App.js
import React, { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./src/app/store";
import RootNavigator from "./src/navigation/RootNavigator";
import { authStateListener } from "./src/services/authListener";

import { initDB } from "./src/services/database";

export default function App() {

  useEffect(() => {
    
    initDB()
      .then(() => console.log("📌 Base de datos inicializada"))
      .catch((err) => console.error("DB init error", err));

    
    authStateListener(store);
  }, []);

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
