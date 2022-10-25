import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { OnClickLink } from 'src/components/atoms/Link/OnClickLink';
import { homePath } from 'src/utils/paths';

export const HeaderItem = ({
  path,
  label,
  onClick,
}: {
  path?: string;
  label: string;
  onClick?: () => void;
}) => {
  const { pathname } = useRouter();

  const LinkComponent = useMemo(
    () => (!!onClick ? OnClickLink : InternalLink),
    [onClick],
  );

  return (
    <LinkComponent href={path as any} onClick={onClick}>
      <span
        className={`cursor-pointer px-2 transition duration-150 ease-in-out 
        text-nav-color hover:text-[rgba(0,0,0,0.7)]
        ${
          // if on home route, force dark styles, otherwise only in darkmode
          pathname === homePath
            ? 'text-dark-nav-color hover:text-[hsla(0,0%,100%,.8)]'
            : 'dark:text-dark-nav-color dark:hover:text-[hsla(0,0%,100%,.8)]'
        }
        ${
          // active route
          pathname === path &&
          `font-bold ${
            path === homePath ? '!text-white' : '!text-black dark:!text-white'
          }`
        }`}
      >
        {label}
      </span>
    </LinkComponent>
  );
};
