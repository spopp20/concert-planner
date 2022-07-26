import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";

const defaultEventSelect = ({
  id: true,
  name: true,
  active: true,
  description: true,
  venue: true,
  location: true,
  notes: true,
  telephone: true,
  startDateTime: true,
});

export const eventRouter = createRouter()
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.event.findMany({
        select: defaultEventSelect,
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
      const event = await ctx.prisma.event.findUnique({
        where: { id },
        select: defaultEventSelect,
      });
      if (!event) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No event with id '${id}'`,
        });
      }
      return event;
    },
  })
  // delete
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ ctx, input }) {
      const { id } = input;
      await ctx.prisma.event.delete({ where: { id } });
      return {
        id,
      };
    },
  });
