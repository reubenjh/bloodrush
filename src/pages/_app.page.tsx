// src/pages/_app.tsx
import type { AppType } from 'next/app';
import { AuthProvider } from 'src/providers/AuthProvider';
import { UserProvider } from 'src/providers/UserProvider';
import '../styles/globals.css';
import { trpc } from '../utils/trpc';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <AuthProvider>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </AuthProvider>
  );
};

export default trpc.withTRPC(MyApp);
