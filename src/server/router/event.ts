import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";
import { EventModel } from '../../zod';

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
   // create
   .mutation('add', {
    input: EventModel,
    async resolve({ ctx, input}) {
      const event = await ctx.prisma.event.create({
        select: defaultEventSelect,
        data: input,
      });
      return event;
    },
  })
  .query("all", {
    async resolve({ ctx }) {
      return await ctx.prisma.event.findMany({
        select: defaultEventSelect,
        orderBy: {
          startDateTime: 'asc',
        } 
      });
    },
  })
  // by primary key
  .query('byId', {
    input: z.object({
      id: z.string().cuid(),
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
      id: z.string().cuid(),
    }),
    async resolve({ ctx, input }): Promise<{ id: string; }> {
      const { id } = input;
      await ctx.prisma.event.delete({ where: { id } });
      return {
        id,
      };
    },
  })
  // edit
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      data: EventModel,
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input;
      const event = await ctx.prisma.event.update({
        where: { id },
        data,
      });
      return event;
    },
  });
