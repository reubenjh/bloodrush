/* eslint-disable react/no-unescaped-entities */
import { useSession } from 'next-auth/react';
import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { NextPage } from 'next/types';
import bg from 'public/images/old.webp';
import { useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { H2 } from 'src/components/atoms/Typography/H2';
import { P } from 'src/components/atoms/Typography/P';
import { Page } from 'src/components/layouts/Page';
import { homePath } from 'src/utils/paths';
import { trpc } from 'src/utils/trpc';

const NewUser: NextPage = () => {
  const [username, setUsername] = useState('');
  const { push } = useRouter();
  const [usernameMissingError, setUsernameMissingError] = useState(false);
  const { data: sessionData } = useSession();
  // https://stackoverflow.com/questions/70405436/next-auth-how-to-update-the-session-client-side
  const reloadSession = () => {
    const event = new Event('visibilitychange');
    document.dispatchEvent(event);
  };
  const { mutateAsync: updateName, error } = trpc.user.updateName.useMutation({
    onSuccess: () => {
      reloadSession();
      push(homePath);
    },
  });

  const onEmailSignIn = async () => {
    setUsernameMissingError(false);
    if (!username) return setUsernameMissingError(true);
    await updateName({
      id: sessionData?.user?.id,
      name: username,
    });
  };

  return (
    <Page>
      <div className="flex flex-row justify-center">
        <div className="hidden md:block w-1/2 h-1/2 max-w-xl mr-6">
          <Image src={bg} width={750} height={457} alt="" placeholder="blur" />
        </div>
        <div className="w-[24rem] ml-8 flex flex-col">
          <H2 className="mb-5">Create your account.</H2>
          <P>Looks like you're new to Bloodrush! Please choose a username.</P>
          <div className="mb-2">
            <Input
              type="email"
              placeholder="Username..."
              onChange={setUsername}
              error={usernameMissingError}
            />
          </div>

          <Button className="max-w-[160px]" onClick={onEmailSignIn}>
            Submit
          </Button>

          {error && (
            <div className="alert alert-danger my-4 max-w-sm" role="alert">
              {error.message}
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

export default NewUser;
