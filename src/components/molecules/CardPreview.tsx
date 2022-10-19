import Image from 'next/future/image';
import { ModalType, useModal } from 'src/providers/ModalProvider';
import {
  CardType,
  CARD_PREVIEW_HEIGHT,
  CARD_PREVIEW_WIDTH,
} from 'src/types/card';

// import { Line } from '../atoms/Line';

export const CardPreview = ({ card }: { card: CardType }) => {
  const { openModal } = useModal();

  return (
    <>
      {/* 
        NOTE dont use the consts for the h and w for the container below in tailwind classes, 
            tailwind jit strips them and the images go whack
      */}
      <div
        className="h-[357px] w-[256px] flex flex-col justify-center 
          rounded-[15px] bloodrush-card"
      >
        <Image
          height={CARD_PREVIEW_HEIGHT}
          width={CARD_PREVIEW_WIDTH}
          alt={card.name}
          src={card.variants[0]?.src ?? ''}
          onClick={() => openModal(ModalType.VIEWCARD, { card })}
        />
      </div>

      {/* include deck quantity update footer */}
      {/* {!!deck && (
        <>
          <div className="flex flex-row justify-center my-2">
            <QuickQuantitySelector deck={deck} card={card} />
          </div>
          <Line className="my-1" />
        </>
      )} */}
    </>
  );
};
