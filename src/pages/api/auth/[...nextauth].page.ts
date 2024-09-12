// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import jwt from 'jsonwebtoken';
import NextAuth, { type NextAuthOptions } from 'next-auth';
// import DiscordProvider from 'next-auth/providers/discord';
import EmailProvider from 'next-auth/providers/email';
import { createTransport } from 'nodemailer';
// import GoogleProvider from 'next-auth/providers/google';
// import TwitchProvider from 'next-auth/providers/twitch';
import { env } from '../../../env/server.mjs';
import { prisma } from '../../../server/db/client';

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        // Include user.id on session
        session.user.id = user.id;
        // Add knock notification key
        (session.user as any).notificationkey = jwt.sign(
          {
            sub: user.id.toString(),
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 6000 * 6000, // ~416 days lol
          },
          env.KNOCK_SIGNING_KEY,
          {
            algorithm: 'RS256',
          },
        );
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user',
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: env.EMAIL_SERVER,
      from: `Bloodrush <${env.EMAIL_FROM}>`,
      async sendVerificationRequest({
        identifier: to,
        url,
        provider: { server, from },
      }) {
        // NOTE: You are not required to use `nodemailer`, use whatever you want.
        const transport = createTransport(server);
        const result = await transport.sendMail({
          to,
          from,
          subject: `Sign in to Bloodrush`,
          text: 'Sign in to Bloodrush',
          html: html({ url }),
        });
        const failed = result.rejected.concat(result.pending).filter(Boolean);
        if (failed.length) {
          throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`);
        }
      },
    }),
    // DiscordProvider({
    //   clientId: env.DISCORD_CLIENT_ID,
    //   clientSecret: env.DISCORD_CLIENT_SECRET,
    // }),
    // GoogleProvider({
    //   clientId: env.GOOGLE_CLIENT_ID,
    //   clientSecret: env.GOOGLE_CLIENT_SECRET,
    // }),
    // TwitchProvider({
    //   clientId: env.TWITCH_CLIENT_ID,
    //   clientSecret: env.TWITCH_CLIENT_SECRET,
    // }),
  ],
};

function html(params: { url: string }) {
  const { url } = params;

  return `
  <body>
    <p>Hi, you requested to sign into Bloodrush.</p>
    <p>Please follow the magic link below to complete your sign in.</p>
    <p><a href="${url}">${url}</a></p>
  </body>
`;
}

export default NextAuth(authOptions);
