import { CssBaseline, CssVarsProvider, extendTheme } from '@mui/joy';
import React from 'react';

import type { PropsWithChildren } from 'react';

export const theme = extendTheme({
  colorSchemes: {
    dark: {},
  },
});

export default function Theme({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />

      {children}
    </CssVarsProvider>
  );
}
