"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const ReactqueryProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactqueryProvider;
