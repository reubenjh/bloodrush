// src/pages/_app.tsx
import '@knocklabs/react-notification-feed/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { AppType } from 'next/app';
import { ThemeProvider } from 'src/providers/ThemeProvider';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <NextThemeProvider
      defaultTheme="system"
      attribute="class"
      themes={['t.dark', 't.light']}
    >
      <ThemeProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </ThemeProvider>
    </NextThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
