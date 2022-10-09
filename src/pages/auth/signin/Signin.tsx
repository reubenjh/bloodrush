/* eslint-disable react/no-unescaped-entities */
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import bg from 'public/images/old.webp';
import { useMemo, useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { LineWithText } from 'src/components/atoms/LineWithText';
import { H2 } from 'src/components/atoms/Typography/H2';
import { Page } from 'src/components/layouts/Page';
import { trpc } from 'src/utils/trpc';
import { SigninError } from './SigninError';

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
    <Page>
      <div className="t.flex t.flex-row t.justify-center">
        <div className="t.hidden md:t.block t.w-1/2 t.h-1/2 t.max-w-xl t.mr-6">
          <div className="t.relative">
            <Image
              src={bg}
              width={750}
              height={457}
              alt=""
              placeholder="blur"
            />
            <div
              className="t.absolute t.top-0 t.left-0 t.h-full t.w-full"
              style={{
                backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.8) 100%,
        rgba(0, 0, 0, 0)`,
              }}
            ></div>
          </div>
        </div>
        <div className="t.w-[16rem] t.ml-8 t.flex t.flex-col t.justify-center t.items-center">
          <H2 className="t.mb-5">Sign in</H2>
          {emailProvider && (
            <>
              <div className="t.mb-2">
                <Input
                  type="email"
                  placeholder="Email address..."
                  onChange={setEmail}
                  error={emailMissingError}
                />
              </div>

              <Button className="t.w-full" onClick={onEmailSignIn}>
                Email
              </Button>

              <LineWithText className="t.my-4" text="or" />
            </>
          )}

          {oAuthProviders && (
            <>
              {Object.values(oAuthProviders).map((provider) => (
                <Button
                  key={provider.name}
                  className="t.w-full t.mb-2"
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: callbackUrl as string,
                    })
                  }
                >
                  {provider.name}
                </Button>
              ))}
            </>
          )}

          {error && (
            <div className="alert alert-danger t.my-2 t.max-w-sm" role="alert">
              <SigninError
                error={error as string}
                hasTrpcError={hasTrpcError}
              />
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default Signin;
