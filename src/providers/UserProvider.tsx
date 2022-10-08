import { User } from '@prisma/client';
import React, {
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { trpc } from 'src/utils/trpc';
import { useAuth } from './AuthProvider';

type UserContextProps = {
  user?: User;
  isLoading: boolean;
};

const UserContext = React.createContext<UserContextProps>(
  {} as UserContextProps,
);

const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): React.ReactElement => {
  const { remote_id, isLoading: authLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | undefined>();

  trpc.user.get.useQuery(
    { remote_id: remote_id },
    {
      enabled: !!remote_id,
      onSuccess(data) {
        setUser(data!);
        setIsLoading(false);
      },
    },
  );

  // watches auth provider context data and clears data accordingly
  // note remote_id will be detected and used to fetch user data automagically by trpc
  useEffect(() => {
    if (!authLoading) {
      if (!remote_id) {
        // user is not logged in
        setIsLoading(false);
        // need to manually set user as undefined here so logout clears the user session
        setUser(undefined);
      }
    }
  }, [remote_id, authLoading]);

  const memoisedValue = useMemo(() => {
    return {
      user,
      isLoading,
    };
  }, [user, isLoading]);

  return (
    <UserContext.Provider value={memoisedValue}>
      {children}
    </UserContext.Provider>
  );
};

const useUser = (): UserContextProps => useContext(UserContext);
export { UserProvider, useUser };
