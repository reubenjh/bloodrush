/* eslint-disable react/no-unescaped-entities */
import Image from 'next/future/image';
import bg from 'public/images/gaze.jpg';
import { H4 } from './Typography/H4';

export const NoResults = () => (
  <div className="flex flex-row justify-center text-center my-10 animate-in fade-in">
    <div className="flex flex-row justify-center h-full items-center">
      <div className="max-w-[280px] hidden md:block mr-6">
        <Image src={bg} width={280} height={414} alt="" placeholder="blur" />
      </div>

      <div className="max-w-md text-left">
        <H4 className="!mb-1">No results</H4>
        <div>Try widening your search!</div>
      </div>
    </div>
  </div>
);
