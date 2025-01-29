import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { tanstackClient } from "@shared/configs/tanstack-query.config.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={tanstackClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
