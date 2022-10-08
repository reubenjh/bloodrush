import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import React, {
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { app } from 'src/utils/firebase';
import { homePath } from 'src/utils/paths';
import { trpc } from 'src/utils/trpc';

// import { notify } from './NotificationProvider';

type AuthContextProps = {
  remote_id?: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps>(
  {} as AuthContextProps,
);

const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  const router = useRouter();
  const [remote_id, setRemoteUuid] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  // const { mutateAsync: createUser } = trpc.useMutation(['users.create']);
  const { mutateAsync: createUser } = trpc.user.create.useMutation();
  const handleError = useErrorHandler();

  useEffect(() => {
    return getAuth(app).onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          if (firebaseUser.emailVerified) {
            // Trigger
            setRemoteUuid(firebaseUser.uid);
          } // todo: else, redirect to you're not email verified page
        } catch (error) {
          handleError(error);
        }
      }
      setIsLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = getAuth(app);
    const creds = await signInWithEmailAndPassword(auth, email, password);
    if (creds.user.emailVerified) {
      /**
       * We are logged in! Redirect to homepage, no further sign in action needed.
       *
       * The above firebase auth state watcher will
       *  - detect successful firebase login with verified email,
       *  - decode the jwt claims,
       *  - set the remoteUuid for the user provider to pick up and fetch the user obj from hasura
       */
      router.push(homePath);
    } else {
      throw new Error(
        'Your email address is not verified, please follow the link in the verification email we sent before trying again.',
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signUp = useCallback(
    async (email: string, password: string, username: string) => {
      const auth = getAuth(app);
      const creds = await createUserWithEmailAndPassword(auth, email, password);
      try {
        await creds.user.getIdToken(true);
        await createUser({
          remote_id: creds.user.uid,
          name: username,
          email,
        });

        // send firebase email verification
        await sendEmailVerification(creds.user);

        // firebase logs you in after registering, so we're just immediately logging you back out.
        // this is required so the signin page itself triggers an auth state change to fetch the user obj from hasura
        // note this step has to happen as late as possible as the below error catcher to delete the user can only delete
        // the current signed in user.
        // notify({ message: 'Success!' });
        auth.signOut();
      } catch (error) {
        // if anything goes wrong during post firebase user creation account setup steps, roll back and delete the firebase account.
        // this ensures people don't have their email address taken up in firebase and can try again
        await deleteUser(creds.user);
        // manually trigger showing the UI shows the error fallback component so this critical error
        // doesn't get swallowed up by the UI error display on the register page, and the error gets logged to sentry
        // notify({ message: 'Something went wrong!', type: 'error' });
        handleError(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const signOut = useCallback(async () => {
    const auth = getAuth(app);
    await firebaseSignOut(auth);
    setRemoteUuid(undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const memoisedValue = useMemo(() => {
    return {
      remote_id,
      isLoading,
      signIn,
      signUp,
      signOut,
    };
  }, [remote_id, isLoading, signIn, signUp, signOut]);

  return (
    <AuthContext.Provider value={memoisedValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextProps => useContext(AuthContext);
export { AuthProvider, useAuth };
