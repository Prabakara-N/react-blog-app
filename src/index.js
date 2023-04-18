import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";
import UserInfoContextProvider from "./context/UserInfoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserInfoContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserInfoContextProvider>
  </React.StrictMode>
);
