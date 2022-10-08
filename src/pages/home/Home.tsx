import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { H1 } from 'src/components/atoms/Typography/H1';
import { H3 } from 'src/components/atoms/Typography/H3';
import { Page } from 'src/components/layouts/Page';
import { SplashImage } from 'src/pages/home/SplashImage';

const Home: NextPage = () => {
  // const { data: sessionData } = useSession();
  // console.log({ user: sessionData?.user });
  return (
    <>
      <SplashImage />
      <Page>
        <div className="t.mt-[40vh] t.mb-28">
          <div className="t.text-center t.text-white t.mb-4">
            <H1 className="!t.mb-2">Bloodrush</H1>
            <H3>A Flesh and Blood deckbuilder.</H3>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Home;
