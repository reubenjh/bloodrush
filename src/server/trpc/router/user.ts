import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { authedProcedure, t } from '../trpc';

export const userRouter = t.router({
  updateName: authedProcedure
    .input(
      z.object({
        id: z.string().nullish(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!input.id)
        throw new TRPCError({
          message: 'You must be signed in',
          code: 'BAD_REQUEST',
        });

      if (await ctx.prisma.user.findUnique({ where: { name: input.name } })) {
        throw new TRPCError({
          message: 'Username unavailable',
          code: 'BAD_REQUEST',
        });
      }

      return ctx.prisma.user.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
        },
      });
    }),
});
