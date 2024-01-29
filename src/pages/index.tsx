import todec from '2dec';
import { Box, Input, Stack, Typography } from '@mui/joy';
import React from 'react';

import Canvas from '@/components/atoms/Canvas';
import Page from '@/components/layout/Page';
import { useDataStore } from '@/stores/data';

export default function Index() {
  const distance = useDataStore((s) => s.distance);
  const setGridTrueSize = useDataStore((s) => s.setGridTrueSize);

  return (
    <Page>
      <Stack gap={2.5}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Canvas />
        </Box>

        <Stack gap={1}>
          <Stack direction="row" justifyContent="space-between">
            <Typography level="title-md">Distance</Typography>
            <Typography>{todec(distance)} meters</Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography level="title-md">Grid square size (m)</Typography>
            <Input
              color="neutral"
              size="sm"
              variant="soft"
              type="text"
              sx={{ width: '75px' }}
              placeholder="0"
              onChange={(event) => {
                const { value } = event.target;
                if (/[0-9]+/.test(value)) setGridTrueSize(Number(value));
              }}
            />
          </Stack>
        </Stack>

        <Typography level="body-sm" textAlign="center">
          Left mouse button for position 1. Right mouse button for position 2.
        </Typography>
      </Stack>
    </Page>
  );
}
