import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";

const defaultInstrumentSelect = ({
  id: true,
  name: true,
  active: true,
  description: true,
  createdAt: true,
});

export const instrumentRouter = createRouter()
.query("all", {
  async resolve({ ctx }) {
    return await ctx.prisma.instrument.findMany({
      select: defaultInstrumentSelect,
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
    id: z.string(),
  }),
  async resolve({ ctx, input }) {
    const { id } = input;
    await ctx.prisma.instrument.delete({ where: { id } });
    return {
      id,
    };
  },
});
