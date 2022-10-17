import type { NextPage } from 'next';
import { Page } from 'src/components/layouts/Page';
import { SearchCards } from 'src/components/organisms/SearchCards/SearchCards';

const Cards: NextPage = () => {
  return (
    <Page
      title="Bloodrush | Cards"
      description={`Explore all cards in the Flesh and Blood TCG card pool.`}
      image="todo"
    >
      <div className="t.-mt-4">
        <SearchCards />
      </div>
    </Page>
  );
};

export default Cards;
