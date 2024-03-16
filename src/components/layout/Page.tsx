import Box from '@mui/joy/Box';
import React from 'react';

import Theme from '../utils/Theme';

import type { PropsWithChildren } from 'react';

export default function Page({ children }: PropsWithChildren) {
  return (
    <Theme>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          padding: 4,
          minHeight: '100svh',
        }}
      >
        {children}
      </Box>
    </Theme>
  );
}
