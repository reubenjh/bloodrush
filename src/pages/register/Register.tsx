/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import bg from 'public/images/reg.webp';
import { useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { LoadingSpinner } from 'src/components/atoms/LoadingSpinner';
import { H2 } from 'src/components/atoms/Typography/H2';
import { Page } from 'src/components/layouts/Page';
import { useAuth } from 'src/providers/AuthProvider';
import { signinPath } from 'src/utils/paths';
import { trpc } from 'src/utils/trpc';

const Register: NextPage = () => {
  const router = useRouter();
  const { signUp } = useAuth();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState('');

  const [error, setError] = useState('');
  const [emailMissingError, setEmailMissingError] = useState(false);
  const [usernameMissingError, setUsernameMissingError] = useState(false);
  const [usernameUnavailableError, setUsernameUnavailableError] =
    useState(false);
  const [passwordMissingError, setPasswordMissingError] = useState(false);
  const [passwordMatchMissingError, setPasswordMatchMissingError] =
    useState(false);
  const [passwordMismatchError, setPasswordMismatchError] = useState(false);

  const [confirmStep, setConfirmStep] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  const { data: isUsernameAvailable, mutateAsync: getIsUsernameAvailable } =
    trpc.useMutation(['users.isUsernameAvailable']);

  const onRegister = async () => {
    // clear errs
    setError('');
    setUsernameMissingError(false);
    setUsernameUnavailableError(false);
    setPasswordMissingError(false);
    setEmailMissingError(false);
    setPasswordMatchMissingError(false);
    setPasswordMismatchError(false);
    setShowSpinner(false);
    setConfirmStep(false);

    // set errors
    if (!username) return setUsernameMissingError(true);
    if (!password) return setPasswordMissingError(true);
    if (!email) return setEmailMissingError(true);
    if (!passwordMatch) return setPasswordMatchMissingError(true);
    if (password !== passwordMatch) return setPasswordMismatchError(true);

    // check username availability
    await getIsUsernameAvailable({ username });
    if (!isUsernameAvailable) return setUsernameUnavailableError(true);

    // sign up
    try {
      setShowSpinner(true);
      await signUp(email, password, username);
      // show next step instructions in UI
      setShowSpinner(false);
      setConfirmStep(true);
    } catch (e: any) {
      setError(e?.message ?? 'Something went wrong');
      setShowSpinner(false);
    }
  };

  return (
    <Page>
      {showSpinner ? (
        <div className="t.flex t.flex-col t.justify-center min-h-[60vh]">
          <div className="t.flex t.flex-row t.justify-center">
            <LoadingSpinner isLoading={showSpinner} />
          </div>
        </div>
      ) : (
        <div className="t.flex t.flex-row">
          <div className="t.hidden md:t.block t.w-1/2 t.max-w-xs t.mr-6">
            <Image
              src={bg}
              width={559}
              height={826}
              alt=""
              placeholder="blur"
            />
          </div>
          <div className="sm:t.w-full md:t.w-1/2 xl:t.w-5/12">
            {!confirmStep ? (
              <>
                <H2 className="t.mb-5">Register</H2>
                <div className="t.mb-2">
                  <div>Username</div>
                  <Input
                    onChange={setUsername}
                    value={username}
                    error={usernameMissingError || usernameUnavailableError}
                  />
                  {usernameUnavailableError && (
                    <div className="alert alert-danger t.mt-3" role="alert">
                      Sorry that username is taken!
                    </div>
                  )}
                </div>
                <div className="t.mb-2">
                  <div>Email address</div>
                  <Input
                    type="email"
                    onChange={setEmail}
                    value={email}
                    error={emailMissingError}
                  />
                </div>
                <div className="t.mb-2">
                  <div>Password</div>
                  <Input
                    type="password"
                    onChange={setPassword}
                    value={password}
                    error={passwordMissingError || passwordMismatchError}
                  />
                </div>

                <div>
                  <div>Confirm password</div>
                  <Input
                    type="password"
                    onChange={setPasswordMatch}
                    value={passwordMatch}
                    error={passwordMatchMissingError || passwordMismatchError}
                  />
                  {passwordMismatchError && (
                    <div className="alert alert-danger t.mt-3" role="alert">
                      Looks like your password doesn't match
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  onClick={onRegister}
                  disabled={!username || !password || !email || !passwordMatch}
                >
                  Register
                </Button>

                <InternalLink className="t.mt-2 t.ml-4" href={signinPath}>
                  Already have an account? Sign in.
                </InternalLink>

                {error && (
                  <div className="alert alert-danger t.mt-3" role="alert">
                    {error}
                  </div>
                )}
              </>
            ) : (
              <>
                <H2 className="t.mb-5">Account Confirmation</H2>

                <p className="t.pb-2">
                  We sent you an email confirmation to <strong>{email}</strong>{' '}
                  to complete your account creation. When you've done that, come
                  back here and sign in.
                </p>

                <Button
                  onClick={() => router.push(signinPath)}
                  className="t.min-w-[100px]"
                >
                  Sign in
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </Page>
  );
};

export default Register;
