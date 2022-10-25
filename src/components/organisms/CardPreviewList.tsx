import { useAutoAnimate } from '@formkit/auto-animate/react';
import { CardType } from 'src/types/card';
import { CardPreview } from '../molecules/CardPreview';

type Props = {
  cards: CardType[];
};

export const CardPreviewList = ({ cards }: Props) => {
  const [parent] = useAutoAnimate({ duration: 150 });
  return (
    <div className="flex flex-row flex-wrap justify-center" ref={parent as any}>
      {cards.map((card, i) => {
        return (
          <div key={i} className="m-1">
            <CardPreview card={card} />
          </div>
        );
      })}
    </div>
  );
};
