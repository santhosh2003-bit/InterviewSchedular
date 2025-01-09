import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { InterviewProvider } from "./context/InterviewContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <InterviewProvider>
      <App />
    </InterviewProvider>
  </React.StrictMode>
);
