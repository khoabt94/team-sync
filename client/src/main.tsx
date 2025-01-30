import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { tanstackClient } from "@shared/configs/tanstack-query.config.ts";
import { QueryClientProvider } from "@tanstack/react-query";

import "./index.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={tanstackClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
