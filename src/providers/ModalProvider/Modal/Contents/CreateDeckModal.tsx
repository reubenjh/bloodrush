import { Dialog } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Line } from 'src/components/atoms/Line';
import { Radio } from 'src/components/atoms/Radio';
import { P } from 'src/components/atoms/Typography/P';
import { Combobox } from 'src/components/molecules/Combobox';
import { Select } from 'src/components/molecules/Select';
import { useModal } from 'src/providers/ModalProvider/ModalProvider';
import { notify } from 'src/providers/NotificationProvider';
import { DeckFormat, DeckVisibility } from 'src/types/deck';
import { trpc } from 'src/utils/trpc';

export const CreateDeckModal = () => {
  const { data: heroes } = trpc.card.heroes.useQuery();

  const { closeModal } = useModal();
  const { push } = useRouter();
  const utils = trpc.useContext();
  const { mutateAsync: createDeck, error: trpcError } =
    trpc.deck.create.useMutation({
      onSuccess: () => {
        notify({ message: 'Deck created' });
        utils.deck.getLatest.invalidate();
        utils.deck.getMyLatest.invalidate();
        // push(`/decks/${data!.id}`);
        closeModal();
      },
    });

  const [deckName, setDeckName] = useState('');
  const [format, setFormat] = useState(DeckFormat.CONSTRUCTED);
  const [visibility, setVisibility] = useState(DeckVisibility.PUBLIC);

  const [heroKey, setHeroKey] = useState<string>();
  const [nameMissingError, setNameMissingError] = useState(false);
  const [error, setError] = useState('');

  // Track trpc errors for display
  useEffect(() => {
    if (trpcError) {
      setError(trpcError.message);
    }
  }, [trpcError]);

  const onCreate = async () => {
    // clear errs
    setError('');
    setNameMissingError(false);

    if (!deckName) return setNameMissingError(true);
    if (!deckName) return setNameMissingError(true);
    if (!heroKey) return; // todo make error show on combobox

    createDeck({
      name: deckName,
      format,
      visibility,
      heroKey,
    });
  };

  return (
    <>
      <div className="p-6">
        {/* content */}
        <div className="mt-2 text-sm">
          <Dialog.Title as="h3" className="text-xl font-medium">
            Create Deck
          </Dialog.Title>
          <div className="my-6 w-full">
            <div className="w-full mb-2">
              <div className="mb-1">Name</div>
              <div>
                <Input
                  autoFocus
                  onChange={setDeckName}
                  error={nameMissingError}
                  placeholder="Name your deck..."
                />
              </div>
            </div>

            <div className="w-full mb-4">
              <Combobox
                title="Hero"
                options={(heroes ?? []).map((h) => ({
                  label: h.name,
                  value: h.key,
                }))}
                onSelect={(key) => setHeroKey(key)}
              />
            </div>

            <div className="mb-4 flex">
              <div className="w-1/2">
                <Select
                  title="Format"
                  options={Object.values(DeckFormat)}
                  defaultValue={DeckFormat.CONSTRUCTED}
                  onSelect={(item) => setFormat(item as DeckFormat)}
                />
              </div>
              <div className="w-1/2 ml-4">
                <div className="mb-1">Visibility</div>
                <div className="flex">
                  {Object.values(DeckVisibility).map((v) => (
                    <Radio
                      key={v}
                      item={v}
                      checked={visibility === v}
                      onSelect={(item) => setVisibility(item as DeckVisibility)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <P className="mt-4">Dont worry, this can all be changed later.</P>

            {error && (
              <div className="alert alert-danger t.my-3" role="alert">
                {error}
              </div>
            )}
          </div>
        </div>

        {/* footer */}
        <Line />
        <div className="pt-6 sm:flex sm:flex-row-reverse">
          <Button onClick={onCreate} variant="primary" className="text-sm">
            Create
          </Button>
          <Button onClick={closeModal} className="text-sm mx-2">
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
};
