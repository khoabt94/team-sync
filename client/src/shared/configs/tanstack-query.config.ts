import { QueryClient } from "@tanstack/react-query";

export const tanstackClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 0,
      staleTime: 1000 * 60,
    },
  },
});
