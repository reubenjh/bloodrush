import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { t } from '../../trpc';

export const userRouter = t.router({
  // hello: t.procedure
  //   .input(z.object({ text: z.string().nullish() }).nullish())
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input?.text ?? 'world'}`,
  //     };
  //   }),
  get: t.procedure
    .input(z.object({ remote_id: z.string().nullish() }))
    .query(({ ctx, input }) => {
      // if (!input.remote_id) {
      //   throw new TRPCError({ message: 'Wot', code: 'BAD_REQUEST' });
      // }
      // return ctx.prisma.user.findUniqueOrThrow({
      //   where: { remote_id: input.remote_id },
      // });
      return { success: true };
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
      return ctx.prisma.user.create({
        data: {
          ...input,
        },
      });
    }),
});
