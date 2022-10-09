import Image from 'next/future/image';
import bg from 'public/images/old.webp';

export const SplashImage = () => (
  <>
    <Image
      className="t.-z-[1] t.absolute t.w-full t.h-[calc(100%-80px)] t.max-h-[788px] t.object-cover t.object-[center_30%] t.gradient-mask-b-80"
      alt=""
      height={1024}
      width={1024}
      src={bg}
      placeholder="blur"
    />
    <div
      className="t.-z-[1] t.absolute t.w-full t.h-[calc(100%-80px)] t.max-h-[788px] t.gradient-mask-b-80"
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
