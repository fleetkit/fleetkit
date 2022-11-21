import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import { z } from "zod";
import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import cors from "cors";
import path from "path";
import { users } from "./lib/db";

const createContext = ({ req, res }: trpcExpress.CreateExpressContextOptions) => ({});
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

// Api endpoints.
const router = t.router({
  createUser: t.procedure.input(z.object({
    email: z.string(),
    password: z.string()
  })).mutation(async req => {
    const user = await users.create(req.input.email, req.input.password);
    return user ? "success" : "failure";
  })
});

const app = express();

// Enable cors for the /api endpoints.
app.use("/api", cors());

// Add the trpc middleware for the /api endpoints.
app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router,
    createContext
  })
);

// If not development then serve the static site (www folder).
if (!process.env.TS_NODE_DEV) {
  app.get("/*", (req, res) => {
    const url = path.parse(req.url);

    if (url.ext === ".html" || url.ext === "") {
      res.sendFile(path.join(__dirname, "www", "index.html"));
      return;
    }

    res.sendFile(path.join(__dirname, "www", req.url));
  });
}

// Start the server.
app.listen(3000, () => {
  console.log("listening on port 3000");
});

export type AppRouter = typeof router;