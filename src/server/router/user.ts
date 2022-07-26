/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";


/**
 * Default selector for User.
 * It's important to always explicitly say which fields you want to return in order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
 const defaultUserSelect = ({
    id: true,
    name: true,
    email: true,
    emailVerified: true,
  });

  export const userRouter = createRouter()
    // create
    // .mutation('add', {
    //   input: z.object({
    //     id: z.string().optional(),
    //     name: z.string().min(5).max(64),
    //     email: z.string().min(10),
    //     emailVerified: z.boolean().optional(),
    //   }),

    //   async resolve({ ctx, input}) {
    //     const user = await ctx.prisma.user.create({
    //       data: input,
    //       //select: defaultUserSelect,
    //     });
    //     return user;
    //   },
    // })
    // read
    .query('all', {
      async resolve({ ctx }) {
        
        /**
         * For pagination you can have a look at this docs site
         * @link https://trpc.io/docs/useInfiniteQuery
         */
  
        return ctx.prisma.user.findMany({
          select: defaultUserSelect,
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
        const user = await ctx.prisma.user.findUnique({
          where: { id },
          select: defaultUserSelect,
        });
        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `No user with id '${id}'`,
          });
        }
        return user;
      },
    })
    // update
    // .mutation('edit', {
    //   input: z.object({
    //     id: z.string().uuid(),
    //     data: z.object({
    //       name: z.string().min(1).max(32),
    //       email: z.string().min(1).max(32),
    //       emailVerified: z.boolean(),
    //     }),
    //   }),
    //   async resolve({ ctx, input }) {
    //     const { id, data } = input;
    //     const user = await ctx.prisma.user.update({
    //       where: { id },
    //       data,
    //       select: defaultUserSelect,
    //     });
    //     return user;
    //   },
    // })
    // delete
    .mutation('delete', {
      input: z.object({
        id: z.string(),
      }),
      async resolve({ ctx, input }) {
        const { id } = input;
        await ctx.prisma.user.delete({ where: { id } });
        return {
          id,
        };
      },
    });