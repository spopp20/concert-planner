import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";

const defaultSongSelect = ({
  id: true,
  title: true,
  active: true,
  alias: true,
  startKey: true,
  tempoCd: true,
  startWords: true,
  arrangement: true,
});

export const songRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.song.findMany({
        select: defaultSongSelect,
      });
    },
  })
  // unique
  .query('byId', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      const song = await ctx.prisma.song.findUnique({
        where: { id },
        select: defaultSongSelect,
      });
      if (!song) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No song with id '${id}'`,
        });
      }
      return song;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      await ctx.prisma.song.delete({ where: { id } });
      return {
        id,
      };
    },
  });
