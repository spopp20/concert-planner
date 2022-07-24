import { createRouter } from "./context";
import { z } from "zod";

export const instrumentRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.instrument.findMany();
    },
  });
