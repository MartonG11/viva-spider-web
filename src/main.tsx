import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./auth/AuthContext.tsx";
import { queryClient } from "./lib/queryClient.ts";
import { ModeProvider } from "./theme/ModeProvider.tsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ModeProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ModeProvider>
  </React.StrictMode>
);
