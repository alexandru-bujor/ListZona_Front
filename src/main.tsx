import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./contexts/AppContext";
import App from "./App";
import "./styles.css";

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
    </React.StrictMode>,
  );
}
