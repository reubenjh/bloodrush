import Image from 'next/future/image';
import { NextPage } from 'next/types';
import bg from 'public/images/old.webp';
import { H2 } from 'src/components/atoms/Typography/H2';
import { P } from 'src/components/atoms/Typography/P';
import { Page } from 'src/components/layouts/Page';

const Verify: NextPage = () => {
  return (
    <Page>
      <div className="flex flex-row justify-center">
        <div className="hidden md:block w-1/2 h-1/2 max-w-xl mr-6">
          <Image src={bg} width={750} height={457} alt="" placeholder="blur" />
        </div>
        <div className="w-[24rem] ml-8 flex flex-col">
          <H2 className="mb-5">Check your email.</H2>
          <P>A magic sign in link has been sent to your email address.</P>
        </div>
      </div>
    </Page>
  );
};

export default Verify;
