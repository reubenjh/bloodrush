import { NextPage } from 'next/types';
import { H2 } from 'src/components/atoms/Typography/H2';
import { P } from 'src/components/atoms/Typography/P';
import { Page } from 'src/components/layouts/Page';

const Verify: NextPage = () => {
  return (
    <Page>
      <div className="t.flex t.flex-row t.justify-center">
        <div className="t.flex t.flex-col t.justify-center t.items-center">
          <H2 className="t.mb-5">Check your email.</H2>
          <P>A magic sign in link has been sent to your email address.</P>
        </div>
      </div>
    </Page>
  );
};

export default Verify;
