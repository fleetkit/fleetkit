import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "server";

export default createTRPCProxyClient<AppRouter>({
  links: [httpBatchLink({
    url: process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api"
      : `${location.origin}/api`
  })],
});