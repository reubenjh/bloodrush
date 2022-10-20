// src/pages/_app.tsx
import '@knocklabs/react-notification-feed/dist/index.css';
import type { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import type { AppType } from 'next/app';
import { ModalProvider } from 'src/providers/ModalProvider/ModalProvider';
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
      themes={['dark', 'light']}
    >
      <SessionProvider session={session}>
        <ThemeProvider>
          <ModalProvider>
            <Component {...pageProps} />
          </ModalProvider>
        </ThemeProvider>
      </SessionProvider>
    </NextThemeProvider>
  );
};

export default trpc.withTRPC(MyApp);
