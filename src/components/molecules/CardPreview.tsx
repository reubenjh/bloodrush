import Image from 'next/future/image';
import {
  CardType,
  CARD_PREVIEW_HEIGHT,
  CARD_PREVIEW_WIDTH,
} from 'src/types/card';
// import { ModalType, useModal } from 'src/providers/ModalProvider';
import { Line } from '../atoms/Line';

export const CardPreview = ({ card }: { card: CardType }) => {
  // const { openModal } = useModal();

  return (
    <>
      {/* 
        NOTE dont use the consts for the h and w for the container below in tailwind classes, 
            tailwind jit strips them and the images go whack
      */}
      <div
        className="t.h-[357px] t.w-[256px] t.flex t.flex-col t.justify-center 
          t.rounded-[17px] curiosa-card"
      >
        <Image
          height={CARD_PREVIEW_HEIGHT}
          width={CARD_PREVIEW_WIDTH}
          alt={card.name}
          src={card.variants[0]!.src}

          // onClick={() => {
          //   !!deck
          //     ? openModal(ModalType.EDITCARD, { card, deck })
          //     : openModal(ModalType.VIEWCARD, { card });
          // }}
        />
      </div>

      {/* include deck quantity update footer */}
      {/* {!!deck && (
        <>
          <div className="t.flex t.flex-row t.justify-center t.my-2">
            <QuickQuantitySelector deck={deck} card={card} />
          </div>
          <Line className="t.my-1" />
        </>
      )} */}
    </>
  );
};
