import Script from 'next/script';
import React from 'react';

import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <Script
        defer
        src={new URL(
          '/script.js',
          process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN,
        ).toString()}
        data-website-id={process.env.NEXT_PUBLIC_ANALYTICS_ID}
        data-host-url={process.env.NEXT_PUBLIC_ANALYTICS_DOMAIN}
      />
    </>
  );
}

export default App;
