import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import "./styles.css";
import { getContents } from "./services/api/contentApi";

if (import.meta.env.DEV) {
  Object.assign(window, { getContents });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);