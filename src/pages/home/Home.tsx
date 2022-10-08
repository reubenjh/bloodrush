import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { H1 } from 'src/components/atoms/Typography/H1';
import { H3 } from 'src/components/atoms/Typography/H3';
import { Page } from 'src/components/layouts/Page';
import { SplashImage } from 'src/pages/home/SplashImage';
import { PreviewGrids } from './PreviewGrids';
import { SearchBox } from './SearchBox';

const text = ['decks.', 'cards.', 'content.'];

const Home: NextPage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      3000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <>
      <SplashImage />
      <Page>
        <div className="t.mt-[38vh] t.mb-28">
          <div className="t.text-center t.text-white t.mb-4">
            <H1 className="!t.mb-2">Bloodrush.</H1>
            <H3>
              <span className="t.hidden sm:t.inline-block">Your home for</span>{' '}
              Flesh and Blood{' '}
              <TextTransition
                className="!t.inline-block"
                springConfig={presets.wobbly}
              >
                {text[index % text.length]}
              </TextTransition>
            </H3>
          </div>
          <div className="t.pb-40"> {/* <SearchBox /> */}</div>
        </div>

        {/* <PreviewGrids /> */}
      </Page>
    </>
  );
};

export default Home;
