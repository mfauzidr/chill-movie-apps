import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { RouterProvider } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import router from "./routes/router";
import "./styles.css";
import { getContentsApi } from "./services/api/contentApi";

import { store } from "./stores/redux/store";

if (import.meta.env.DEV) {
  Object.assign(window, { getContentsApi });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </StrictMode>,
);
