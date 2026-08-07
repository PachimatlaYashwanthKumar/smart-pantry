import React from "react";
import ReactDOM from "react-dom/client";

import { Toaster } from "react-hot-toast";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { AuthProvider } from "./context/AuthContext";

import App from "./App";

import "./index.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
          }}
        />

        <App />

        <ReactQueryDevtools
          initialIsOpen={false}
        />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);