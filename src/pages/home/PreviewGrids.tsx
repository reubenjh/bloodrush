import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { decksPath, userPath } from 'src/utils/paths';
import { trpc } from 'src/utils/trpc';
import { DeckGrid } from './DeckGrid';

export const PreviewGrids = () => {
  const { data: sessionData } = useSession();

  const { data: latestDecks } = trpc.deck.getLatest.useQuery();
  const { data: myLatestDecks } = trpc.deck.getMyLatest.useQuery(undefined, {
    enabled: !!sessionData?.user,
  });

  const showMyLatestDecksSection = useMemo(
    () => !!sessionData?.user && myLatestDecks?.length,
    [myLatestDecks?.length, sessionData?.user],
  );

  return (
    <>
      {/* My latest decks */}
      {showMyLatestDecksSection && (
        <DeckGrid
          decks={myLatestDecks! as any}
          header="Continue"
          subheader="My decks"
          href={userPath(sessionData!.user!.id)}
          whiteText={true}
        />
      )}

      {/* Latest decks */}

      <div className="t.min-h-[50vh]">
        <DeckGrid
          decks={(latestDecks ?? []) as any}
          header="Latest Decks"
          subheader="See all"
          href={decksPath}
          whiteText={!showMyLatestDecksSection}
        />
      </div>
    </>
  );
};
