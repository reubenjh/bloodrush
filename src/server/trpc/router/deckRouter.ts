import { z } from 'zod';
import { authedProcedure, t } from '../trpc';

export const deckRouter = t.router({
  create: authedProcedure
    .input(
      z.object({
        name: z.string(),
        format: z.string(),
        visibility: z.string(),
        heroKey: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      console.log(input);
      return ctx.prisma.deck.create({
        data: {
          ...input,
          userId: ctx.session.user.id,
          featureKey: input.heroKey,
        },
      });
    }),
  getLatest: t.procedure.query(({ ctx }) => {
    return ctx.prisma.deck.findMany({
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        feature: {
          include: {
            variants: true,
          },
        },
        hero: {
          include: {
            variants: true,
          },
        },
        decklist: {
          include: {
            card: true,
            variant: true,
          },
        },
        user: true,
      },
      take: 12,
    });
  }),
  getMyLatest: authedProcedure.query(({ ctx }) => {
    return ctx.prisma.deck.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      include: {
        feature: {
          include: {
            variants: true,
          },
        },
        hero: {
          include: {
            variants: true,
          },
        },
        decklist: {
          include: {
            card: true,
            variant: true,
          },
        },
        user: true,
      },
      take: 3,
    });
  }),
});
