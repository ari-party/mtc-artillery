import Script from 'next/script';
import React from 'react';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Script
        defer
        src="/analytics/script.js"
        data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
      />
    </>
  );
}

export default App;
