import todec from '2dec';
import { Box, Input, Option, Select, Stack, Typography } from '@mui/joy';
import React from 'react';

import Canvas from '@/components/atoms/Canvas';
import Notes from '@/components/atoms/Notes';
import Page from '@/components/layout/Page';
import { useDataStore } from '@/stores/data';

export default function Index() {
  const distance = useDataStore((s) => s.distance);
  const setGridTrueSize = useDataStore((s) => s.setGridTrueSize);
  const setCellSize = useDataStore((s) => s.setCellSize);
  const canvasWidth = useDataStore((s) => s.size);
  const positions = useDataStore((s) => s.positions);

  return (
    <Page>
      <Box
        sx={{
          display: 'flex',
          flexDirection: {
            xs: 'column',
            md: 'row',
          },

          gap: 5,
        }}
      >
        <Stack gap={2.5} width={canvasWidth}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Canvas />
          </Box>

          <Stack
            gap={0.5}
            sx={{
              '& > div': {
                alignItems: 'center',
                height: '35px',
              },
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography level="title-md">Distance</Typography>
              <Typography>{todec(distance)} meters</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography level="title-md">Azimuth</Typography>
              <Typography>
                {todec(
                  Math.abs(
                    (90 +
                      (Math.atan2(
                        (positions.to?.y || 0) - (positions.from?.y || 0),
                        (positions.to?.x || 0) - (positions.from?.x || 0),
                      ) *
                        180) /
                        Math.PI +
                      360) %
                      360,
                  ),
                )}
                °
              </Typography>
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
                  if (/^[0-9]+$/.test(value)) setGridTrueSize(Number(value));
                }}
              />
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography level="title-md">Cell size</Typography>
              <Select
                defaultValue="112.5"
                onChange={(event, newValue) => {
                  if (newValue) setCellSize(Number(newValue));
                }}
              >
                <Option value="112.5">4x4</Option>
                <Option value="75">6x6</Option>
                <Option value="50">9x9</Option>
                <Option value="37.5">12x12</Option>
              </Select>
            </Stack>
          </Stack>

          <Typography level="body-sm" textAlign="center">
            Left mouse button for position 1. Right mouse button for position 2.
          </Typography>
        </Stack>

        <Notes />
      </Box>
    </Page>
  );
}
