import type { NextPage } from 'next';
import { H1 } from 'src/components/atoms/Typography/H1';
import { H3 } from 'src/components/atoms/Typography/H3';
import { Page } from 'src/components/layouts/Page';
import { SplashImage } from 'src/pages/home/SplashImage';

const Home: NextPage = () => {
  return (
    <>
      <SplashImage />
      <Page>
        <div className="t.mt-[40vh] t.mb-28">
          <div className="t.text-center t.text-white t.mb-4">
            <H1 className="!t.mb-2">Bloodrush</H1>
            <H3>Tear your friends limb from limb</H3>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Home;
