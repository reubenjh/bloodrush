import Image from 'next/future/image';
import logob from 'public/images/logo-black.png';
import logow from 'public/images/logo-white.png';

export const Logo = () => {
  return <Image src={logob} width={70} height={33} alt="" placeholder="blur" />;
};
