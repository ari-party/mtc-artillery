import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider } from '@mui/joy/styles/CssVarsProvider';
import extendTheme from '@mui/joy/styles/extendTheme';
import React from 'react';

import type { PropsWithChildren } from 'react';

export const theme = extendTheme({});

export default function Theme({ children }: PropsWithChildren) {
  return (
    <CssVarsProvider theme={theme} defaultMode="dark">
      <CssBaseline />

      {children}
    </CssVarsProvider>
  );
}
