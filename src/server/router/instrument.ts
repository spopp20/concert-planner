import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";
import { InstrumentModel } from '../../zod';

const defaultInstrumentSelect = ({
  id: true,
  name: true,
  active: true,
  description: true,
  createdAt: true,
});

export const instrumentRouter = createRouter()
// create
.mutation('add', {
  input: InstrumentModel,
  async resolve({ ctx, input}) {
    const instrument = await ctx.prisma.instrument.create({
      select: defaultInstrumentSelect,
      data: input,
    });
    return instrument;
  },
})
.query("all", {
  async resolve({ ctx }) {
    return await ctx.prisma.instrument.findMany({
      select: defaultInstrumentSelect,
      orderBy: {
        name: 'asc',
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
    const instrument = await ctx.prisma.instrument.findUnique({
      where: { id },
      select: defaultInstrumentSelect,
    });
    if (!instrument) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `No instrument with id '${id}'`,
      });
    }
    return instrument;
  },
})
// delete
.mutation('delete', {
  input: z.object({
    id: z.string().cuid(),
  }),
  async resolve({ ctx, input }) {
    const { id } = input;
    await ctx.prisma.instrument.delete({ where: { id } });
    return {
      id,
    };
  },
})
// edit
.mutation('edit', {
  input: z.object({
    id: z.string().cuid(),
    data: InstrumentModel,
  }),
  async resolve({ ctx, input }) {
    const { id, data } = input;
    const instrument = await ctx.prisma.instrument.update({
      where: { id },
      data,
    });
    return instrument;
  },
});
