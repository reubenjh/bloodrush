/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Image from 'next/future/image';
import bg from 'public/images/gaze.jpg';
import { H1 } from 'src/components/atoms/Typography/H1';

// import bg from 'public/images/dream.webp';

export const Offline: NextPage = () => {
  return (
    <div className="container mx-auto p-4 h-[80vh]">
      <div className="flex flex-row justify-center h-full items-center">
        <div className="hidden md:block max-w-xs mr-6">
          <Image src={bg} width={559} height={826} alt="" placeholder="blur" />
        </div>

        <div className="max-w-md">
          <H1>Offline</H1>
          <div>Bloodrush is in maintenance mode, we'll be back soon!</div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
