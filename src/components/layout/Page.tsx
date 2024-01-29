import { Box } from '@mui/joy';
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
          padding: 2,
          height: '100svh',
          width: '100svw',
        }}
      >
        {children}
      </Box>
    </Theme>
  );
}
