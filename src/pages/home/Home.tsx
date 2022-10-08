import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';
import { H1 } from 'src/components/atoms/Typography/H1';
import { H3 } from 'src/components/atoms/Typography/H3';
import { Page } from 'src/components/layouts/Page';
import { SplashImage } from 'src/pages/home/SplashImage';

const text = ['Bloodrush.', 'Brew Decks.', 'Crush your friends.'];

const Home: NextPage = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      4000, // every 4 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);
  return (
    <>
      <SplashImage />
      <Page>
        <div className="t.mt-[40vh] t.mb-28">
          <div className="t.text-center t.text-white t.mb-4">
            <H1 className="!t.mb-2">
              <TextTransition inline springConfig={presets.default}>
                {text[index % text.length]}
              </TextTransition>
            </H1>
            <H3>A Flesh and Blood deckbuilder.</H3>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Home;
