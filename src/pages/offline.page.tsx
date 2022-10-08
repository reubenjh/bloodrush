/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from 'next';
import Image from 'next/future/image';
import { H1 } from 'src/components/atoms/Typography/H1';
// import bg from 'public/images/dream.webp';


export const Offline: NextPage = () => {
  return (
    <div className="t.container t.mx-auto t.p-4 t.h-[80vh]">
      <div className="t.flex t.flex-row t.justify-center t.h-full t.items-center">
        {/* <div className="t.hidden md:t.block t.max-w-xs t.mr-6">
          <Image src={bg} width={559} height={826} alt="" placeholder="blur" />
        </div> */}

        <div className="t.max-w-md">
          <H1>Offline</H1>
          <div>Bloodrush is in maintenance mode, we'll be back soon!</div>
        </div>
      </div>
    </div>
  );
};

export default Offline;
