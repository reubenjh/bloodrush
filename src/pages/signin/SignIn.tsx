import type { NextPage } from 'next';
import Image from 'next/future/image';
// import bg from 'public/images/signin.webp';
import { useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { H2 } from 'src/components/atoms/Typography/H2';
import { Page } from 'src/components/layouts/Page';
import { useAuth } from 'src/providers/AuthProvider';
import { registerPath } from 'src/utils/paths';

const SignIn: NextPage = () => {
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailMissingError, setEmailMissingError] = useState(false);
  const [passwordMissingError, setPasswordMissingError] = useState(false);

  const [error, setError] = useState('');

  const onSignIn = async () => {
    // clear errs
    setError('');
    setEmailMissingError(false);
    setPasswordMissingError(false);

    // set errors
    if (!email) return setEmailMissingError(true);
    if (!password) return setPasswordMissingError(true);

    // sign in
    try {
      await signIn(email, password);
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong');
      console.error(e?.message ?? 'Something went wrong');
    }
  };

  return (
    <Page>
      <div className="t.flex t.flex-row">
        {/* <div className="t.hidden md:t.block t.w-1/2 t.max-w-xs t.mr-6">
          <Image src={bg} width={326} height={483} alt="" placeholder="blur" />
        </div> */}
        <div className="sm:t.w-full md:t.w-1/2 xl:t.w-5/12">
          <H2 className="t.mb-5">Sign in</H2>
          <div className="t.mb-2">
            <div>Email address</div>
            <Input type="email" onChange={setEmail} error={emailMissingError} />
          </div>
          <div>
            <div>Password</div>
            <Input
              type="password"
              onChange={setPassword}
              error={passwordMissingError}
            />
          </div>

          <Button
            variant="primary"
            onClick={onSignIn}
            disabled={!password || !email}
          >
            Sign in
          </Button>

          <InternalLink className="t.mt-2 t.ml-4" href={registerPath}>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            Don't have an account? Sign up now.
          </InternalLink>

          {error && (
            <div className="alert alert-danger t.mt-3" role="alert">
              {error}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default SignIn;
