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
        className={`t.cursor-pointer t.px-2 t.transition t.duration-150 t.ease-in-out 
        t.text-nav-color hover:t.text-[rgba(0,0,0,0.7)]
        ${
          // if on home route, force dark styles, otherwise only in darkmode
          pathname === homePath
            ? 't.text-dark-nav-color hover:t.text-[hsla(0,0%,100%,.8)]'
            : 'dark:t.text-dark-nav-color dark:hover:t.text-[hsla(0,0%,100%,.8)]'
        }
        ${
          // active route
          pathname === path &&
          `t.font-bold ${
            path === homePath
              ? '!t.text-white'
              : '!t.text-black dark:!t.text-white'
          }`
        }`}
      >
        {label}
      </span>
    </LinkComponent>
  );
};
