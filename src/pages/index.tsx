import { Box, Stack, Typography } from '@mui/joy';
import Head from 'next/head';
import React from 'react';

import Canvas from '@/components/atoms/Canvas';
import AzimuthValue from '@/components/atoms/data/Azimuth';
import DistanceValue from '@/components/atoms/data/Distance';
import ElevationValue from '@/components/atoms/data/Elevation';
import MapSelection from '@/components/atoms/data/Map';
import VelocityInput from '@/components/atoms/data/Velocity';
import Page from '@/components/layout/Page';
import { useDataStore } from '@/stores/data';
import useHasHydrated from '@/utils/hasHydrated';
import {
  calculateAzimuth,
  calculateDistance,
  calculateElevation,
} from '@/utils/math';

import type { Map } from '@/components/atoms/Canvas';

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

export default function Index() {
  const hasHydrated = useHasHydrated();
  const [map, setMap] = useDataStore((s) => [s.map, s.setMap]);
  const [gun, target] = useDataStore((s) => [s.gun, s.target]);
  const [velocity, setVelocity] = useDataStore((s) => [
    s.velocity,
    s.setVelocity,
  ]);

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
            {hasHydrated && (
              <>
                <DistanceValue distance={distance} />
                <ElevationValue
                  gun={gun}
                  target={target}
                  elevation={elevation}
                />
                <AzimuthValue gun={gun} target={target} azimuth={azimuth} />
                <VelocityInput velocity={velocity} setVelocity={setVelocity} />
                <MapSelection maps={maps} setMap={setMap} />
              </>
            )}
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
