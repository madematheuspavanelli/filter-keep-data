import { RouterProvider } from "react-router-dom";

import "@/styles/global.css";
import { routes } from "@/router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={routes} />;
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
