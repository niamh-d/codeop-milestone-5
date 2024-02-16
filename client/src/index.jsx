import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import App from "./App";
import "./index.css";
import { StudentsProvider } from "./contexts/StudentsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StudentsProvider>
      <App />
    </StudentsProvider>
  </React.StrictMode>
);
