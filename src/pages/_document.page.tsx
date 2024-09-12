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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Emoji:wght@700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="text-base bg-background dark:bg-dark-background text-text-color dark:text-dark-text-color">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default MyDocument;
