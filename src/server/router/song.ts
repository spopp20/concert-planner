import { createRouter } from "./context";
import { z } from "zod";

export const songRouter = createRouter()
  .query("getAll", {
    async resolve({ ctx }) {
      return await ctx.prisma.song.findMany();
    },
  });
