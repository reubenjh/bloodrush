import Image from 'next/future/image';
import logob from 'public/images/logo-black.png';
import logow from 'public/images/logo-white.png';

export const Logo = () => {
  // return <Image src={logob} width={70} height={33} alt="" placeholder="blur" />;
  {
    /* t.p-1 t.px-2 t.border t.rounded-xl t.border-white */
  }
  return (
    <div className="t.text-white">
      <span className="t.font-logo t.text-3xl t.font-bold">🩸</span>
      <span className="t.font-title t.relative t.top-[-2px] t.text-2xl t.pr-1">
        bloodrush
      </span>
    </div>
  );
};
