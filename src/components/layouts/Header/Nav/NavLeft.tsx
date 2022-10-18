import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { homePath, decksPath, cardsPath } from 'src/utils/paths';
import { Logo } from '../../../atoms/Logo';
import { HeaderItem } from './HeaderItem';

export const NavLeft = () => {
  return (
    <div className="flex flex-row items-center">
      {/* logo */}
      <div className="cursor-pointer mr-20">
        <InternalLink href={homePath}>
          <Logo />
        </InternalLink>
      </div>

      {/* nav links */}
      <div className="hidden lg:visible lg:flex items-center">
        <HeaderItem path={homePath} label="Home" />
        {/* <HeaderItem path={decksPath} label="Decks" /> */}
        <HeaderItem path={cardsPath} label="Cards" />
      </div>
    </div>
  );
};
