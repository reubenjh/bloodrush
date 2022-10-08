import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../trpc';

export const userRouter = t.router({
  get: t.procedure
    .input(z.object({ remote_id: z.string().nullish() }))
    .query(({ ctx, input }) => {
      if (!input.remote_id) {
        throw new TRPCError({
          message: 'Please provide a remote_id to query on',
          code: 'BAD_REQUEST',
        });
      }
      return ctx.prisma.user.findUniqueOrThrow({
        where: { remote_id: input.remote_id },
      });
    }),
  create: t.procedure
    .input(
      z.object({
        remote_id: z.string(),
        name: z.string(),
        email: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      console.log('in create');
      return ctx.prisma.user.create({
        data: {
          ...input,
        },
      });
    }),
});
