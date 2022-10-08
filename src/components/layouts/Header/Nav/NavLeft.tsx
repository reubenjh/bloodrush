import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { homePath, decksPath, cardsPath } from 'src/utils/paths';
import { Logo } from '../../../atoms/Logo';
import { HeaderItem } from './HeaderItem';

export const NavLeft = () => {
  return (
    <div className="t.flex t.flex-row t.items-center">
      {/* logo */}
      <div className="t.cursor-pointer t.mr-20">
        <InternalLink href={homePath}>
          <Logo />
        </InternalLink>
      </div>

      {/* nav links */}
      <div className="t.hidden lg:t.visible lg:t.flex t.items-center">
        <HeaderItem path={homePath} label="Home" />
        {/* <HeaderItem path={decksPath} label="Decks" /> */}
        <HeaderItem path={cardsPath} label="Cards" />
      </div>
    </div>
  );
};
