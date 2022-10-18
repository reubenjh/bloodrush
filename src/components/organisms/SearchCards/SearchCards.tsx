import { useEffect, useMemo, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { CardPreviewList } from 'src/components/molecules/CardPreviewList';
import { CardType } from 'src/types/card';
import { trpc } from 'src/utils/trpc';
import { Input } from '../../atoms/Input';
import { NoResults } from '../../atoms/NoResults';

// import { CardPreviewList } from '../molecules/CardPreviewList';

export const SearchCards = () => {
  const [searchString, setSearchString] = useState<string>('');
  const [resultCards, setResultCards] = useState<CardType[]>([]);

  const { data: cards } = trpc.card.get.useQuery({ search: searchString });

  // Update search / filter results
  useEffect(() => {
    const newCards: CardType[] = cards ?? [];

    // const elementFilters = filters.filter((f) => f.type === FilterType.ELEMENT);
    // if (elementFilters.length) {
    //   newCards = [
    //     ...newCards.filter(
    //       (c) =>
    //         (elementFilters.find((f) => f.value === CardElement.EARTH) &&
    //           !!c.earth_threshold) ||
    //         (elementFilters.find((f) => f.value === CardElement.FIRE) &&
    //           !!c.fire_threshold) ||
    //         (elementFilters.find((f) => f.value === CardElement.WATER) &&
    //           !!c.water_threshold) ||
    //         (elementFilters.find((f) => f.value === CardElement.AIR) &&
    //           !!c.wind_threshold),
    //     ),
    //   ] as Card[];
    // }

    // const typeFilters = filters.filter((f) => f.type === FilterType.TYPE);
    // if (typeFilters.length) {
    //   newCards = [
    //     ...newCards.filter((c) =>
    //       typeFilters.find((f) => f.value === c.card_type),
    //     ),
    //   ] as Card[];
    // }
    // const rarityFilters = filters.filter((f) => f.type === FilterType.RARITY);
    // if (rarityFilters.length) {
    //   newCards = [
    //     ...newCards.filter((c) =>
    //       rarityFilters.find((f) => f.value === c.rarity),
    //     ),
    //   ] as Card[];
    // }

    // const keywordFilters = filters.filter((f) => f.type === FilterType.KEYWORD);
    // if (keywordFilters.length) {
    //   newCards = [
    //     ...newCards.filter((c) =>
    //       (c.keywords ?? []).find((k) =>
    //         // handle alt vaklues (range_x, movement_x, moves_freely)
    //         keywordFilters.find(
    //           (kf) => kf.value === k || kf.altValues?.find((akf) => akf === k),
    //         ),
    //       ),
    //     ),
    //   ] as Card[];
    // }

    // const subtypeFilters = filters.filter((f) => f.type === FilterType.SUBTYPE);
    // if (subtypeFilters.length) {
    //   newCards = [
    //     ...newCards.filter((c) =>
    //       (c.keywords ?? []).find((k) =>
    //         subtypeFilters.find((kf) => kf.value === k),
    //       ),
    //     ),
    //   ] as Card[];
    // }

    // if (searchString) {
    //   const searcher = new JsonSearch(newCards);
    //   newCards = searcher.query(searchString);
    // }

    setResultCards(newCards);
  }, [searchString, cards]);

  const showNoResultsSplash = useMemo(
    () => !!cards?.length && !resultCards.length && !!searchString,
    [cards?.length, resultCards.length, searchString],
  );

  return (
    <div>
      {/* search string */}
      <div
        className="sticky top-0 overflow-auto z-10 
        bg-background 
        dark:bg-dark-background"
      >
        <div className="pt-4">
          <Input
            IconComponent={BiSearch}
            onChange={setSearchString}
            placeholder="Search all card text..."
            value={searchString}
          />
        </div>
      </div>

      {/* <Filters
        open={filtersOpen}
        setOpen={setFiltersOpen}
        filters={filters}
        setFilters={setFilters}
      />

      {!filtersOpen && <Line className="mt-0 mb-2" />}

      {!!filters.length && (
        <FilterBadges
          options={[
            ...keywordOptions,
            ...elementOptions,
            ...typeOptions,
            ...rarityOptions,
          ]}
          selectedArr={filters}
          onChange={(newFilters: FilterOption[]) => setFilters(newFilters)}
        />
      )} */}

      {showNoResultsSplash ? (
        <NoResults />
      ) : (
        <div className="mt-4">
          <CardPreviewList cards={resultCards}></CardPreviewList>
        </div>
      )}
    </div>
  );
};
