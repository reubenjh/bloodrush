import Head from 'next/head';
import { Header } from 'src/components/layouts/Header';

// import { Footer } from './Footer';
// import { Loader } from './Loader';
// import { Modal } from './Modal';

const DEFAULT_TITLE = 'Bloodrush';
const DEFAULT_DESCRIPTION = 'A Flesh and Blood deck building app.';
const DEFAULT_IMAGE = 'todo';

type PageProps = {
  children: any;
  hero?: JSX.Element;
  title?: string;
  description?: string;
  image?: string;
};

export const Page = ({
  children,
  hero,
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
}: PageProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="og:image" content={image} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* content */}
      <main>
        <Header />
        {/* <Loader> */}
        {hero && hero}
        <div className="flex flex-col justify-between min-h-[calc(100vh-4.375rem)]">
          <div className="container mx-auto py-8 px-4">
            <div>{children}</div>
          </div>
          {/* <Footer /> */}
        </div>
        {/* </Loader> */}
      </main>
      {/* <Modal /> */}
    </>
  );
};
