import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import App from "./App.jsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3, // Number of retries on failure
      cacheTime: 300_000, // Cache data for 5 minutes
      staleTime: 0, // Data is considered stale immediately (0ms)
      refetchOnWindowFocus: false, // Automatically refetch on window focus
      refetchOnMount: true, // Don't refetch when the component mounts
      refetchOnReconnect: true, // Automatically refetch on reconnection
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
