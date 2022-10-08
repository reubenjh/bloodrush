import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { DeckPreviewList } from 'src/components/molecules/DeckPreviewList';
import { DeckType } from 'src/types/deck';

export const DeckGrid = ({
  decks,
  header,
  subheader,
  href,
  whiteText,
}: {
  decks: DeckType[];
  header: string;
  subheader: string;
  href: string;
  whiteText: boolean;
}) => {
  return (
    <div className="t.mb-16">
      <div className="t.mb-8">
        <div
          className={`t.font-title t.font-semibold t.text-xl t.text-center ${
            whiteText && 't.text-white'
          }`}
        >
          <span className="t.pr-4">{header}</span>
          <InternalLink
            className={`t.pl-4 t.border-l ${
              whiteText
                ? 't.border-l-white'
                : 't.border-l-black dark:t.border-l-white'
            }`}
            href={href}
            color="primary"
          >
            {subheader}
          </InternalLink>
        </div>
      </div>
      <DeckPreviewList decks={decks}></DeckPreviewList>
    </div>
  );
};
