import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import { Button } from 'src/components/atoms/Button';
import { Logo } from 'src/components/atoms/Logo';
import { P } from 'src/components/atoms/Typography/P';
import { Page } from 'src/components/layouts/Page';
import { trpc } from 'src/utils/trpc';

const Signin: NextPage = () => {
  const { data: providers } = trpc.auth.getProviders.useQuery();
  const {
    query: { callbackUrl },
  } = useRouter();
  return (
    <div className="t.flex t.flex-col t.justify-center t.h-screen t.items-center">
      <div className="t.container t.mx-auto t.py-8 t.px-4 t.flex t.flex-col t.justify-center t.items-center">
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
