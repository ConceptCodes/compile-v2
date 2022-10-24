// src/server/router/_app.ts
import { router } from "../trpc";

import { apiRouter } from "./api";
import { authRouter } from "./auth";

export const appRouter = router({
  v1: apiRouter,
  auth: authRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
