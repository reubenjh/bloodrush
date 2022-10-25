import type { NextPage } from 'next';
import Image from 'next/future/image';
import bg from 'public/images/gaze.jpg';
import { H1 } from 'src/components/atoms/Typography/H1';

// import bg from 'public/images/dream.webp';

export const NotFound: NextPage = () => {
  return (
    <div className="container mx-auto p-4 h-[80vh]">
      <div className="flex flex-row justify-center h-full items-center">
        <div className="hidden md:block max-w-xs mr-6">
          <Image src={bg} width={559} height={826} alt="" placeholder="blur" />
        </div>

        <div className="max-w-md">
          <H1>404</H1>
          <div>This page could not be found</div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
