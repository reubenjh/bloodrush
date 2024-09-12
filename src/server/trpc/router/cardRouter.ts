import { z } from 'zod';
import { CardType, CardTypeEnum } from 'src/types/card';
import { t } from '../trpc';

export const cardRouter = t.router({
  get: t.procedure
    .input(
      z.object({
        search: z.string().nullish(),
      }),
    )
    .query(({ ctx, input }) => {
      return (
        !!input.search
          ? ctx.prisma.card.findMany({
              where: { name: { contains: input.search } },
              include: { variants: true },
            })
          : ctx.prisma.card.findMany({
              include: { variants: true },
            })
      ) as Promise<CardType[]>;
    }),
  heroes: t.procedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany({
      where: { card_type: CardTypeEnum.HERO },
      select: {
        key: true,
        name: true,
      },
    });
  }),
});
