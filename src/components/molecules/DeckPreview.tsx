import Image from 'next/future/image';
import {
  DeckType,
  DeckVisibility,
  DECK_PREVIEW_HEIGHT,
  DECK_PREVIEW_WIDTH,
} from 'src/types/deck';
// import { isNew, hasPrimer, isPrivate } from 'src/utils/decks';
import { deckPath, userPath } from 'src/utils/paths';
import { fromNow } from 'src/utils/time';
// import { Badge } from '../atoms/Badge';
import { InternalLink } from '../atoms/Link/InternalLink';

// import { Metadata } from './Metadata';

type Props = {
  deck: DeckType;
};

export const DeckPreview = ({ deck }: Props) => {
  return (
    <div>
      <InternalLink href={deckPath(deck.id)}>
        {/* Background image */}
        <div
          className="relative w-full h-[200px] cursor-pointer shadow-lg rounded-lg border transition-all overflow-hidden
          border-transparent 
          hover:border-primary hover:shadow-[0_0_14px_rgba(255,123,0,0.75)]"
          style={{
            backgroundImage: `radial-gradient(transparent, rgb(0, 0, 0))`,
          }}
        >
          <Image
            className="absolute -z-[1] w-full h-full object-cover object-[center_17%] rounded-md scale-[1.3]"
            alt=""
            height={DECK_PREVIEW_HEIGHT}
            width={DECK_PREVIEW_WIDTH}
            src={deck.feature.variants[0]?.src ?? ''}
          />
          {/* Wrapper */}
          <div className="flex flex-col justify-between h-full px-5 py-3">
            {/* Heading */}
            <div>
              <div className="text-lg font-bold text-white">{deck.name}</div>
              <div className="text-white -mt-1 text-sm italic">
                {deck.format}
              </div>
            </div>
            {/* Metadata */}
            <div className="flex flex-row justify-between">
              <div>
                {/* {isNew(deck.created_at) && (
                  <Badge text={'New'} variant={'white'} className="mr-1" />
                )}
                {isPrivate(deck.visibility as DeckVisibility) && (
                  <Badge text={'Private'} variant={'info'} className="mr-1" />
                )}
                {hasPrimer(deck.primer) && (
                  <Badge text={'Primer'} variant={'red'} className="mr-1" />
                )} */}
              </div>
              {/* <Metadata views={deck.views} comments={deck.comments.length} /> */}
            </div>
          </div>
        </div>
      </InternalLink>

      {/* Details */}

      <div className="flex flex-row justify-between mt-2.5 mx-4 mb-5 text-sm">
        <InternalLink
          href={userPath(deck.user.id)}
          className="truncate hover:text-primary"
        >
          @{deck.user.name}
        </InternalLink>
        <span className="truncate">Updated {fromNow(deck.updatedAt)}</span>
      </div>
    </div>
  );
};
