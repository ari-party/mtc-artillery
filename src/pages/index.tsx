import { Box, Divider, Stack, Typography } from '@mui/joy';
import Head from 'next/head';
import React from 'react';

import Canvas from '@/components/atoms/Canvas';
import AzimuthValue from '@/components/atoms/configuration/Azimuth';
import DistanceValue from '@/components/atoms/configuration/Distance';
import ElevationValue from '@/components/atoms/configuration/Elevation';
import MapSelection from '@/components/atoms/configuration/Map';
import Presets from '@/components/atoms/configuration/Presets';
import ProjectileSelection from '@/components/atoms/configuration/Projectile';
import Page from '@/components/layout/Page';
import { maps, projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';
import useHasHydrated from '@/utils/hasHydrated';
import {
  calculateAzimuth,
  calculateDistance,
  calculateElevation,
} from '@/utils/math';

export default function Index() {
  const hasHydrated = useHasHydrated();
  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];
  const projectileIndex = useDataStore((s) => s.projectileIndex);
  const projectile = projectiles[projectileIndex];
  const [gun, target] = useDataStore((s) => [s.gun, s.target]);

  const distance =
    (calculateDistance(gun.x, target.x, gun.y, target.y) / 450) *
    (map?.size || 0);

  const azimuth = calculateAzimuth(gun.x, target.x, gun.y, target.y);

  const elevation = calculateElevation(distance, projectile.velocity);

  return (
    <>
      <Head>
        <title>MTC Artillery</title>
      </Head>

      <Page>
        {hasHydrated && (
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
              gap={1}
              sx={{
                '& > div': {
                  alignItems: 'center',
                  height: '35px',
                },
              }}
            >
              <DistanceValue distance={distance} />
              <ElevationValue elevation={elevation} />
              <AzimuthValue azimuth={azimuth} />
              <ProjectileSelection />
              <MapSelection />

              <Divider />

              <Presets />
            </Stack>

            <Typography>
              Left click to set the gun position. Right click to set the target
              position.
            </Typography>
          </Stack>
        )}
      </Page>
    </>
  );
}
