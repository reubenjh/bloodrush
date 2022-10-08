import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import { Highlighter } from 'react-bootstrap-typeahead';
import { TypeaheadMenuProps } from 'react-bootstrap-typeahead/types/components/TypeaheadMenu';
import { Option } from 'react-bootstrap-typeahead/types/types';
import { Typeahead } from 'src/components/atoms/Typeahead';
import cards from 'src/data/cards.json';
import { useUser } from 'src/providers/UserProvider';
import { DeckVisibility } from 'src/types/deck';
import { transformDecks } from 'src/utils/decks';
import { trpc } from 'src/utils/trpc';

type SearchOption = Option & {
  category: 'deck' | 'card';
  id?: string;
  name: string;
};

export const SearchBox = () => {
  const [enabled, setIsEnabled] = useState(false);
  // const { data: decks } = trpc.useQuery(['decks.all'], {
  //   select: transformDecks,
  //   enabled,
  // });
  const router = useRouter();
  const { user } = useUser();

  const searchOptions = useMemo(
    () =>
      [
        ...([] as any)
          .filter(
            (d) =>
              d.visibility === DeckVisibility.PUBLIC ||
              (!!user && d.user.id === user.id),
          )
          .map((d) => {
            return { ...d, category: 'deck' };
          }),
        ...cards.map((c) => {
          return { ...c, category: 'card' };
        }),
      ] as SearchOption[],
    [user],
  );

  const onSearchSelect = ([option]: SearchOption[]) => {
    if (option!.category === 'deck') {
      router.push(`/decks/${option!.id}`);
    } else {
      router.push(`/cards?search=${option!.name}`);
    }
  };

  const renderChild = (option: SearchOption, props: TypeaheadMenuProps) => {
    return (
      <div className="t.flex t.flex-row t.justify-between t.text-sm">
        <span className="t.truncate t.mr-2">
          <Highlighter search={props.text}>{option.name}</Highlighter>
        </span>
        <em
          className={`t.capitalize ${
            option.category === 'deck' ? 't.text-primary' : 't.text-blue'
          }`}
        >
          {option.category}
        </em>
      </div>
    );
  };
  return (
    <div
      className="t.flex t.flex-row t.justify-center"
      onFocus={() => setIsEnabled(true)}
    >
      <Typeahead
        className="t.max-w-[360px] sm:t.max-w-[520px]"
        options={searchOptions}
        onChange={onSearchSelect}
        selectedArr={[]}
        placeholder="Search for anything on Bloodrush..."
        minLength={2}
        customChildRenderer={renderChild as any}
      />
    </div>
  );
};
