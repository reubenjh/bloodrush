/* eslint-disable react/no-unescaped-entities */
import Image from 'next/future/image';
import bg from 'public/images/gaze.jpg';
import { H4 } from './Typography/H4';

export const NoResults = () => (
  <div className="t.flex t.flex-row t.justify-center t.text-center t.my-10 t.animate-in t.fade-in">
    <div className="t.flex t.flex-row t.justify-center t.h-full t.items-center">
      <div className="t.max-w-[280px] t.hidden md:t.block t.mr-6">
        <Image src={bg} width={280} height={414} alt="" placeholder="blur" />
      </div>

      <div className="t.max-w-md t.text-left">
        <H4 className="!t.mb-1">No results</H4>
        <div>Try widening your search!</div>
      </div>
    </div>
  </div>
);
