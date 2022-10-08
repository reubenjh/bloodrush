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
      className={`t.block t.px-4 t.py-1.5 !t.text-text-color hover:!t.text-primary ${
        pathname === path && 't.font-bold'
      }`}
      href={path as any}
      onClick={onClick}
    >
      {IconComponent && (
        <IconComponent
          size={20}
          className="t.mb-[2px] t.mr-[2px] t.inline-block"
        />
      )}
      {label}
    </LinkComponent>
  );
};
