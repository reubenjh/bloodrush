import Image from 'next/future/image';
import bg from 'public/images/old.webp';

export const SplashImage = () => (
  <>
    <Image
      className="-z-[1] absolute w-full h-[calc(100%-80px)] max-h-[788px] object-cover object-[center_30%] gradient-mask-b-80"
      alt=""
      height={1024}
      width={1024}
      src={bg}
      placeholder="blur"
    />
    <div
      className="-z-[1] absolute w-full h-[calc(100%-80px)] max-h-[788px] gradient-mask-b-80"
      style={{
        backgroundImage: `linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0.5) 0%,
        rgba(0, 0, 0, 0.8) 100%,
        rgba(0, 0, 0, 0)`,
      }}
    ></div>
  </>
);
