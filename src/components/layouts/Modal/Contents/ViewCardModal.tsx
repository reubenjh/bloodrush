import Image from 'next/future/image';
import { Button } from 'src/components/atoms/Button';
import { useModal } from 'src/providers/ModalProvider';
import {
  CardType,
  CARD_PREVIEW_HEIGHT,
  CARD_PREVIEW_WIDTH,
} from 'src/types/card';

export const ViewCardModal = ({ card }: { card: CardType }) => {
  const { closeModal } = useModal();

  return (
    <>
      {/* todo daisyui or something */}
      <Modal.Header
        closeButton
        className="dark:border-b-[1px] dark:border-b-dark-line-color"
      >
        <Modal.Title>View Card</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="flex flex-row justify-center m-2">
          <Image
            className="rounded-[17px]"
            height={isSite ? SITE_PREVIEW_HEIGHT : CARD_PREVIEW_HEIGHT}
            width={isSite ? SITE_PREVIEW_WIDTH : CARD_PREVIEW_WIDTH}
            alt={card.name}
            src={getCardImageUrl(card.identifier)}
          />
        </div>
      </Modal.Body>

      <Modal.Footer className="dark:border-t-[1px] dark:border-t-dark-line-color">
        <Button onClick={closeModal}>Cancel</Button>
      </Modal.Footer>
    </>
  );
};
