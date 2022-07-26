// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { eventRouter } from "./event";
import { instrumentRouter } from "./instrument";
import { songRouter } from "./song";
import { userRouter } from "./user";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("event.", eventRouter)
  .merge("instrument.", instrumentRouter)
  .merge("song.", songRouter)
  .merge("user.", userRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
