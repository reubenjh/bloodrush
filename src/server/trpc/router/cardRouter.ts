import { z } from 'zod';
import { t } from '../trpc';

export const cardRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        search: z.string().nullish(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return !!input.search
        ? await ctx.prisma.card.findMany({
            where: { name: { contains: input.search } },
            include: { variants: true },
          })
        : await ctx.prisma.card.findMany({
            include: { variants: true },
          });
    }),
});
