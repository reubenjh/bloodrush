import { useAutoAnimate } from '@formkit/auto-animate/react';
import { DeckType } from 'src/types/deck';
import { DeckPreview } from '../molecules/DeckPreview';

type Props = {
  decks: DeckType[];
};

export const DeckPreviewList = ({ decks }: Props) => {
  const [parent] = useAutoAnimate({ duration: 150 });
  return (
    <div className="flex flex-row flex-wrap justify-center" ref={parent as any}>
      {decks.map((deck, i) => {
        return (
          <div className="w-[380px] sm:w-1/2 lg:w-1/3 xl:w-1/4" key={i}>
            <div className="m-1">
              <DeckPreview deck={deck} />
            </div>
          </div>
        );
      })}
    </div>
  );
};
