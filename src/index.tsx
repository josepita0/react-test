import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import App from "./App";
import { QueryClientProvider } from "./app/providers/QueryClientProvider";
import { RouterProvider } from "./app/providers/RouterProvider";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider>
      <RouterProvider>
        <App />
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
