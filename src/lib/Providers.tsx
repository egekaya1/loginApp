"use client";

import { ReactNode, useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { loadFromStorage } from "./slices/authSlice";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
  
const queryClient = new QueryClient();

export default function Providers({ children }: { children: ReactNode }) {
  useEffect(() => {
    store.dispatch(loadFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </Provider>
  );
}
