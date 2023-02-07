import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
    <span className="credit">created by Kartik Fulara - devChallenges.io</span>
  </React.StrictMode>
);
