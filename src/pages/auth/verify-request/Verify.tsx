import Image from 'next/future/image';
import { NextPage } from 'next/types';
import bg from 'public/images/old.webp';
import { H2 } from 'src/components/atoms/Typography/H2';
import { P } from 'src/components/atoms/Typography/P';
import { Page } from 'src/components/layouts/Page';

const Verify: NextPage = () => {
  return (
    <Page>
      <div className="t.flex t.flex-row t.justify-center">
        <div className="t.hidden md:t.block t.w-1/2 t.h-1/2 t.max-w-xl t.mr-6">
          <Image src={bg} width={750} height={457} alt="" placeholder="blur" />
        </div>
        <div className="t.w-[24rem] t.ml-8 t.flex t.flex-col">
          <H2 className="t.mb-5">Check your email.</H2>
          <P>A magic sign in link has been sent to your email address.</P>
        </div>
      </div>
    </Page>
  );
};

export default Verify;
