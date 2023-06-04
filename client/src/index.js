import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, compose } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers/index.js";
import thunk from "redux-thunk";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = configureStore(
  { reducer: reducers },
  compose(applyMiddleware(thunk))
);
const clientId =
  "797608395282-70igqbcmbr2q74aer309shatad110ln9.apps.googleusercontent.com";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
