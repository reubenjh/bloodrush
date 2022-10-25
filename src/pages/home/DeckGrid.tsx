import { InternalLink } from 'src/components/atoms/Link/InternalLink';
import { DeckPreviewList } from 'src/components/organisms/DeckPreviewList';
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
    <div className="mb-16">
      <div className="mb-8">
        <div
          className={`font-title font-semibold text-xl text-center ${
            whiteText && 'text-white'
          }`}
        >
          <span className="pr-4">{header}</span>
          <InternalLink
            className={`pl-4 border-l ${
              whiteText
                ? 'border-l-white'
                : 'border-l-black dark:border-l-white'
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
