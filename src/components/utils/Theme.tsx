import CssBaseline from '@mui/joy/CssBaseline';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
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
