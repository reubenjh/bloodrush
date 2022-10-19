import { Dialog } from '@headlessui/react';
import Image from 'next/future/image';
import { useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Line } from 'src/components/atoms/Line';
import { OnClickLink } from 'src/components/atoms/Link/OnClickLink';
import { useModal } from 'src/providers/ModalProvider';
import {
  CardType,
  CARD_PREVIEW_HEIGHT,
  CARD_PREVIEW_WIDTH,
} from 'src/types/card';

export const ViewCardModal = ({ card }: { card: CardType }) => {
  const { closeModal } = useModal();
  const [variant, setVariant] = useState(card.variants[0]);

  return (
    <>
      <div className="p-6">
        <div className="mt-3 sm:mt-0 sm:ml-4 text-left">
          <Dialog.Title as="h3" className="text-xl font-medium">
            View Card
          </Dialog.Title>
          <div className="mt-6 flex flex-wrap">
            <Image
              className="mr-4 mb-4 w-[280px] sm:w-[320px] md:w-[358px]"
              height={CARD_PREVIEW_HEIGHT}
              width={CARD_PREVIEW_WIDTH}
              alt={card.name}
              src={variant?.src ?? ''}
            />
            {/* Info */}

            <div className="text-sm">
              {card.name}
              <Line className="my-2" />
              {card.variants.map((v) => (
                <OnClickLink
                  key={v.key}
                  className="block"
                  color={variant?.key === v.key ? 'primary' : 'inherit'}
                  onClick={() => setVariant(v)}
                >
                  {v.key}
                </OnClickLink>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Line />

      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <Button onClick={closeModal} className="text-sm">
          Cancel
        </Button>
      </div>
    </>
  );
};
