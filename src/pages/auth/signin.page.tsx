import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import bg from 'public/images/gaze.jpg';
import { useMemo, useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Line } from 'src/components/atoms/Line';
import { H2 } from 'src/components/atoms/Typography/H2';
import { trpc } from 'src/utils/trpc';
import { SignInError } from './SignInError';

const Signin: NextPage = () => {
  const { data: providers, isLoading } = trpc.auth.getProviders.useQuery();
  const {
    query: { callbackUrl, error },
  } = useRouter();

  const [email, setEmail] = useState('');
  const [emailMissingError, setEmailMissingError] = useState(false);

  const hasTrpcError = useMemo(
    () => !providers && !isLoading,
    [isLoading, providers],
  );

  const oAuthProviders = useMemo(
    () => Object.values(providers ?? {}).filter((p) => p.type === 'oauth'),
    [providers],
  );

  const emailProvider = useMemo(
    () => Object.values(providers ?? {}).find((p) => p.type === 'email'),
    [providers],
  );

  const onEmailSignIn = async () => {
    setEmailMissingError(false);
    if (!email) return setEmailMissingError(true);
    await signIn('email', { email, callbackUrl: callbackUrl as string });
  };

  return (
    <div className="t.flex t.items-center">
      <Image
        className="t.hidden lg:t.block t.h-screen t.object-cover t.object-[center_30%] t.w-5/12"
        alt=""
        height={1080}
        width={842}
        src={bg}
        placeholder="blur"
      />
      <div
        className="t.absolute t.hidden lg:t.block t.h-screen t.w-5/12"
        style={{
          backgroundImage: `linear-gradient(
          to right,
          rgba(0, 0, 0, 0.5) 0%,
          rgba(0, 0, 0, 0.8) 80%)`,
        }}
      ></div>

      <div className="t.grow t.h-screen t.px-20 t.flex t.flex-col t.justify-center">
        <H2 className="t.mb-5">Sign in to Bloodrush</H2>
        {emailProvider && (
          <div className="t.mb-2">
            <Input
              type="email"
              onChange={setEmail}
              error={emailMissingError}
              placeholder="Email address"
            />
            <Button className="t.min-w-[180px] t.mb-2" onClick={onEmailSignIn}>
              Sign in with Email
            </Button>
            <Line className="t.my-2 t.max-w-[240px]" />
          </div>
        )}

        {oAuthProviders && (
          <>
            {Object.values(oAuthProviders).map((provider) => (
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
          </>
        )}

        {(error || hasTrpcError) && (
          <SignInError error={error as string} hasTrpcError={hasTrpcError} />
        )}
      </div>
    </div>
  );
};

export default Signin;
