/* eslint-disable react/no-unescaped-entities */
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { useMemo } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Logo } from 'src/components/atoms/Logo';
import { trpc } from 'src/utils/trpc';

const Signin: NextPage = () => {
  const { data: providers, isLoading } = trpc.auth.getProviders.useQuery();
  const {
    query: { callbackUrl, error },
  } = useRouter();

  const providerError = useMemo(
    () => !providers && !isLoading,
    [isLoading, providers],
  );
  return (
    <div className="t.flex t.flex-col t.justify-center t.h-screen t.items-center">
      <div className="t.container t.mx-auto t.py-8 t.px-4 t.flex t.flex-col t.justify-center t.items-center">
        {error ||
          (providerError && (
            <div className="t.p-6 t.mb-4 t.bg-blue t.text-white t.rounded-lg t.max-w-sm">
              <div>Uh oh. Something went wrong.</div>

              {error && (
                <div className="t.mt-4">
                  This may mean that you've logged in to your bloodrush account
                  before using a different provider than the one you just tried
                  (you can only use 1 per email address). Please try the correct
                  provider, otherwise sign in with email.
                </div>
              )}
              {providerError && (
                <div className="t.mt-4">
                  Looks like this issue is in our system. We've been notified
                  and will hustle to get it sorted. Thanks for your patience.
                </div>
              )}
            </div>
          ))}
        <Logo className="t.mb-6 t.text-center" />

        {providers && (
          <>
            <div className="t.h-full t.flex t.flex-col t.items-center">
              {Object.values(providers).map((provider) => (
                <div key={provider.name}>
                  <Button
                    className="t.min-w-[180px] t.mb-2"
                    onClick={() =>
                      signIn(provider.id, {
                        callbackUrl: callbackUrl as string,
                      })
                    }
                  >
                    Sign in with {provider.name}
                  </Button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Signin;
