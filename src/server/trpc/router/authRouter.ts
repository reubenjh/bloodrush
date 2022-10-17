import { getProviders } from 'next-auth/react';
import { t } from '../trpc';

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getProviders: t.procedure.query(() => {
    return getProviders();
  }),
});
