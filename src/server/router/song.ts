import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";
import { SongModel } from '../../zod';

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
  // create
  .mutation('add', {
    input: SongModel,
    async resolve({ ctx, input}) {
      const song = await ctx.prisma.song.create({
        select: defaultSongSelect,
        data: input,
      });
      return song;
    },
  })
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.song.findMany({
        select: defaultSongSelect,
        orderBy: {
          title: 'asc',
        } 
      });
    },
  })
  // unique
  .query('byId', {
    input: z.object({
      id: z.string().cuid(),
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
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      await ctx.prisma.song.delete({ where: { id } });
      return {
        id,
      };
    },
  })
  // edit
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      data: SongModel,
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      const song = await ctx.prisma.song.update({
        where: { id },
        data,
      });
      return song;
    },
  });
  
