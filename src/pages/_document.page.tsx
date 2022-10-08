import type { DocumentType } from 'next/dist/shared/lib/utils';
import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

// Fix annoying SSR warning logs...
// https://stackoverflow.com/questions/58070996/how-to-fix-the-warning-uselayouteffect-does-nothing-on-the-server
if (typeof document === 'undefined') {
  React.useLayoutEffect = React.useEffect;
}

const MyDocument: DocumentType = () => {
  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="t.text-base t.bg-background dark:t.bg-dark-background t.text-text-color dark:t.text-dark-text-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
