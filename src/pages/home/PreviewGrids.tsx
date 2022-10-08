import { useUser } from 'src/providers/UserProvider';
import { transformContents } from 'src/utils/content';
import { transformDecks } from 'src/utils/decks';
import { decksPath, userPath } from 'src/utils/paths';
import { trpc } from 'src/utils/trpc';
import { ContentGrid } from './ContentGrid';
import { DeckGrid } from './DeckGrid';

export const PreviewGrids = () => {
  const { user } = useUser();

  const { data: latestDecks } = trpc.useQuery(['decks.latest'], {
    select: transformDecks,
  });
  const { data: myLatestDecks } = trpc.useQuery(
    ['decks.user.latest', { user_id: user?.id }],
    {
      enabled: !!user,
      select: transformDecks,
    },
  );
  const { data: latestContent } = trpc.useQuery(['contents.latest'], {
    select: transformContents,
  });

  return (
    <>
      {/* Your latest decks */}
      {!!myLatestDecks?.length && (
        <DeckGrid
          decks={myLatestDecks}
          header="CONTINUE"
          subheader="My decks"
          href={userPath(user!.id)}
          whiteText={true}
        />
      )}

      {/* Latest decks */}
      {!!latestDecks?.length && (
        <DeckGrid
          decks={latestDecks}
          header="LATEST DECKS"
          subheader="See all"
          href={decksPath}
          whiteText={!myLatestDecks?.length}
        />
      )}

      {/* Latest content */}
      {!!latestContent?.length && <ContentGrid content={latestContent} />}
    </>
  );
};
