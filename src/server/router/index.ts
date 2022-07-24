// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { authRouter } from "./auth";
import { exampleRouter } from "./example";
import { eventRouter } from "./event";
import { instrumentRouter } from "./instrument";
import { songRouter } from "./song";


export const appRouter = createRouter()
  .transformer(superjson)
  .merge("example.", exampleRouter)
  .merge("event.", eventRouter)
  .merge("instrument.", instrumentRouter)
  .merge("song.", songRouter)
  .merge("auth.", authRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
