// src/server/router/index.ts
import { t } from '../trpc';
import { authRouter } from './authRouter';
import { cardRouter } from './cardRouter';
import { userRouter } from './userRouter';

export const appRouter = t.router({
  auth: authRouter,
  user: userRouter,
  card: cardRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
