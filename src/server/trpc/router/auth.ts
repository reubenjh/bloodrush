import { getProviders } from 'next-auth/react';
import { t, authedProcedure } from '../trpc';

export const authRouter = t.router({
  getSession: t.procedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getProviders: t.procedure.query(() => {
    const providers = getProviders();
    console.log({ providers });
    return providers;
  }),
  getSecretMessage: authedProcedure.query(() => {
    return 'You are logged in and can see this secret message!';
  }),
});
