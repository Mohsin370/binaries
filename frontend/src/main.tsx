import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "./redux/store.ts";
import { Router } from "./routes/index.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </ReduxProvider>
  </React.StrictMode>
);
