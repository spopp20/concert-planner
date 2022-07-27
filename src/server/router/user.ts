/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { TRPCError } from '@trpc/server';
import { createRouter } from "./context";
import { z } from "zod";
import { UserModel } from '../../zod';


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
    .mutation('add', {
      input: UserModel,
      async resolve({ ctx, input}) {
        const user = await ctx.prisma.user.create({
          select: defaultUserSelect,
          data: input,
        });
        return user;
      },
    })
    // remove this query
    // .query('all', {
    //   async resolve({ ctx }) {
    //     return ctx.prisma.user.findMany({
    //       select: defaultUserSelect,
    //       orderBy: {
    //         name: 'asc',
    //       } 
    //     });
    //   },
    // })
    // unique
    .query('byId', {
      input: z.object({
        id: z.string().cuid(),
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
    // delete
    .mutation('delete', {
      input: z.object({
        id: z.string().cuid(),
      }),
      async resolve({ ctx, input }) {
        const { id } = input;
        await ctx.prisma.user.delete({ where: { id } });
        return {
          id,
        };
      },
    })
    // edit
    .mutation('edit', {
      input: z.object({
        id: z.string().cuid(),
        data: UserModel,
      }),
      async resolve({ ctx, input }) {
        const { id, data } = input;
        const user = await ctx.prisma.user.update({
          where: { id },
          data,
        });
        return user;
      },
    });