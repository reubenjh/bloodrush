import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { IconType } from 'react-icons';
import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { OnClickLink } from 'src/components/atoms/Link/OnClickLink';

export const MenuItem = ({
  path,
  label,
  onClick,
  IconComponent,
}: {
  path?: string;
  label: string;
  onClick?: () => void;
  IconComponent?: IconType;
}) => {
  const { pathname } = useRouter();

  const LinkComponent = useMemo(
    () => (!!onClick ? OnClickLink : InternalLink),
    [onClick],
  );

  return (
    <LinkComponent
      className={`block px-4 py-1.5 !text-text-color hover:!text-primary ${
        pathname === path && 'font-bold'
      }`}
      href={path as any}
      onClick={onClick}
    >
      {IconComponent && (
        <IconComponent size={20} className="mb-[2px] mr-[2px] inline-block" />
      )}
      {label}
    </LinkComponent>
  );
};
