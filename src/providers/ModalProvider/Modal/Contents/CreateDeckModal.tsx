import { Dialog } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'src/components/atoms/Button';
import { Input } from 'src/components/atoms/Input';
import { Line } from 'src/components/atoms/Line';
import { P } from 'src/components/atoms/Typography/P';
import { Combobox } from 'src/components/molecules/Combobox';
import { Select } from 'src/components/molecules/Select';
import { useModal } from 'src/providers/ModalProvider/ModalProvider';
import { notify } from 'src/providers/NotificationProvider';
import { CardType } from 'src/types/card';
import { DeckFormat, DeckVisibility } from 'src/types/deck';
import { trpc } from 'src/utils/trpc';

export const CreateDeckModal = () => {
  const { data: sessionData } = useSession();

  const { closeModal } = useModal();
  const router = useRouter();
  // const { invalidateQueries } = trpc.useContext();
  // const { mutateAsync: createDeck, error: trpcError } = trpc.useMutation(
  //   ['decks.create'],
  //   {
  //     onSuccess: (data) => {
  //       notify({ message: 'Deck created' });
  //       invalidateQueries(['decks.all']);
  //       invalidateQueries(['decks.latest']);
  //       invalidateQueries(['decks.user.latest']);
  //       router.push(`/decks/${data!.id}`);
  //       closeModal();
  //     },
  //   },
  // );
  const [deckName, setDeckName] = useState('');
  const [format, setFormat] = useState(DeckFormat.CONSTRUCTED);
  const [visibility, setVisibility] = useState(DeckVisibility.PUBLIC);
  // const [selectedAvatar, setSelectedAvatar] = useState<Card[]>([]); // dont ask... typeahead lib quirk
  // const avatars = cards.filter((c) => c.card_type === CardType.AVATAR);

  const [nameMissingError, setNameMissingError] = useState(false);
  const [avatarMissingError, setAvatarMissingError] = useState(false);
  const [error, setError] = useState('');

  // Track trpc errors for display
  // useEffect(() => {
  //   if (trpcError) {
  //     setError(trpcError.message);
  //   }
  // }, [trpcError]);

  const onCreate = async () => {
    // clear errs
    setError('');
    setNameMissingError(false);
    setAvatarMissingError(false);

    if (!deckName) return setNameMissingError(true);
    // if (!selectedAvatar?.length) return setAvatarMissingError(true);

    // Can non-null asser here as this modal is not available when not logged in
    // createDeck({
    //   user_id: user!.id,
    //   user_name: user!.username,
    //   name: deckName,
    //   format,
    //   feature_card: selectedAvatar[0]!.identifier,
    //   visibility,
    //   decklist: JSON.stringify(
    //     selectedAvatar.map((c) => {
    //       return {
    //         quantity: 1,
    //         identifier: c.identifier,
    //       };
    //     }),
    //   ),
    // });
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
            <div className="flex flex-row mb-2">
              <div className="w-2/3">
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
              <div className="ml-2 w-1/3">
                <Select
                  title="Format"
                  options={Object.values(DeckFormat)}
                  defaultValue={DeckFormat.CONSTRUCTED}
                />
              </div>
            </div>

            <div className="w-1/2 mb-2">
              <Combobox
                title="Hero"
                options={[
                  { label: 'Bravo', value: '123' },
                  { label: 'Katsu', value: '456' },
                ]}
              />
            </div>

            <div className="mb-2">
              <div className="mb-1">Visibility</div>
              {/* <VisibilityToggle
            options={[DeckVisibility.PUBLIC, DeckVisibility.PRIVATE]}
            onClick={setVisibility}
            checkedOption={visibility}
          /> */}
            </div>

            <P className="t.mt-4">Dont worry, this can all be changed later.</P>

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
