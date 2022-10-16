/* eslint-disable react/no-unescaped-entities */
import { signIn } from 'next-auth/react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import bg from 'public/images/old.webp';
import { useMemo, useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Line } from 'src/components/atoms/Line';
import { H2 } from 'src/components/atoms/Typography/H2';
import { P } from 'src/components/atoms/Typography/P';
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
          <Image src={bg} width={750} height={457} alt="" placeholder="blur" />
        </div>
        <div className="t.w-[24rem] t.ml-8 t.flex t.flex-col">
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

              <Button className="t.max-w-[160px]" onClick={onEmailSignIn}>
                Send magic link
              </Button>
              <Line className="t.my-4" />
              <P className="t.text-sm">
                If you're creating a new account, we'll detect that and take you
                to a setup page after you verify your email.
              </P>

              {/* <LineWithText className="t.my-4" text="or" /> */}
            </>
          )}

          {/* {oAuthProviders && (
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
          )} */}

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
