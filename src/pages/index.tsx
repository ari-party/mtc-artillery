import todec from '2dec';
import { Box, Input, Option, Select, Stack, Typography } from '@mui/joy';
import Head from 'next/head';
import React, { useState } from 'react';

import Canvas from '@/components/atoms/Canvas';
import Page from '@/components/layout/Page';
import { useDataStore } from '@/stores/data';
import {
  calculateAzimuth,
  calculateDistance,
  calculateElevation,
} from '@/utils/math';

import type { Map } from '@/components/atoms/Canvas';
import type { PropsWithChildren } from 'react';

/**
 * Size is calculated by multiplying the grid size (in studs) by the amount of grid cells (usually 9)
 */
export const maps: Map[] = [
  {
    image: '/arctic_airbase.jpeg',
    name: 'Arctic Airbase',
    size: 4041,
  },
  {
    image: '/dustbowl.jpeg',
    name: 'Dustbowl',
    size: 3438,
  },
  {
    image: '/powerplant.png',
    name: 'Powerplant',
    size: 3996,
  },
  {
    image: '/radar_station.jpeg',
    name: 'Radar Station',
    size: 6372,
  },
  {
    image: '/roinburg.jpeg',
    name: 'Roinburg',
    size: 3546,
  },
  {
    image: '/sokolokva.jpeg',
    name: 'Sokolokva',
    size: 5004,
  },
];

function DataContainer({ children }: PropsWithChildren) {
  return (
    <Stack direction="row" justifyContent="space-between">
      {children}
    </Stack>
  );
}

export default function Index() {
  const map = useDataStore((s) => s.map);
  const setMap = useDataStore((s) => s.setMap);
  const [gun, target] = useDataStore((s) => [s.gun, s.target]);
  const [velocity, setVelocity] = useState(150);

  // Convert canvas scale to map scale
  const distance =
    (calculateDistance(gun.x, target.x, gun.y, target.y) / 450) *
    (map?.size || 0);

  const azimuth = calculateAzimuth(gun.x, target.x, gun.y, target.y);

  const elevation = calculateElevation(distance, velocity);

  return (
    <>
      <Head>
        <title>MTC Artillery</title>
      </Head>

      <Page>
        <Stack gap={2.5} width={450}>
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
            <DataContainer>
              <Typography level="title-md">Distance</Typography>
              <Typography>{todec(distance)} studs</Typography>
            </DataContainer>

            <DataContainer>
              <Typography level="title-md">Elevation</Typography>
              <Typography>
                {gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0
                  ? elevation
                    ? `${todec(elevation)}°`
                    : 'Too far'
                  : '0°'}
              </Typography>
            </DataContainer>

            <DataContainer>
              <Typography level="title-md">Azimuth</Typography>
              <Typography>
                {gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0
                  ? todec(azimuth)
                  : 0}
                °
              </Typography>
            </DataContainer>

            <DataContainer>
              <Typography level="title-md">Velocity</Typography>
              <Input
                color="neutral"
                size="sm"
                variant="soft"
                type="text"
                sx={{ width: '90px' }}
                endDecorator={<Typography level="body-sm">(m/s)</Typography>}
                value={velocity}
                onChange={(event) => {
                  const { value } = event.target;
                  if (/^[0-9]+$/.test(value)) setVelocity(Number(value));
                }}
              />
            </DataContainer>

            <DataContainer>
              <Typography level="title-md">Map</Typography>
              <Select
                onChange={(event, newValue) => {
                  setMap(maps[newValue as number]);
                }}
                placeholder="Select a map..."
              >
                {maps.map((item, index) => (
                  <Option key={index} value={index}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </DataContainer>
          </Stack>

          <Typography>
            Left click to set the gun position. Right click to set the target
            position.
          </Typography>
        </Stack>
      </Page>
    </>
  );
}
