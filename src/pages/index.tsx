import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import React from 'react';
import { getEntry } from 'strapi-rest';
import { useIsClient } from 'usehooks-ts';

import Page from '@/components/layout/Page';
import AzimuthValue from '@/components/molecules/configuration/Azimuth';
import DistanceValue from '@/components/molecules/configuration/Distance';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import Canvas from '@/components/organisms/Canvas';
import Footer from '@/components/organisms/Footer';
import Motd from '@/components/organisms/Motd';
import { maps, projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';
import {
  calculateAzimuth,
  calculateDistance,
  calculateElevation,
  studsToMeters,
} from '@/utils/math';

import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{
    version: string;
    motd: string | null;
  }>
> {
  const version = (process.env.VERCEL_GIT_COMMIT_SHA ?? 'dev').slice(0, 9);
  let motd;

  if (process.env.STRAPI_URL && process.env.STRAPI_TYPE) {
    try {
      const entry = await getEntry({
        apiUrl: process.env.STRAPI_URL as string,
        id: process.env.STRAPI_TYPE as string,
      });

      if (entry.attributes.text) motd = entry.attributes.text as string;
    } catch (_) {
      // Don't handle error
    }
  }

  return {
    props: {
      version,
      motd: motd || null,
    },
    revalidate: 120,
  };
}

export default function Index({
  version,
  motd,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isClient = useIsClient();
  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];
  const [projectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);
  const projectile = projectiles[projectileIndex];
  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const distance =
    calculateDistance(gun.x, target.x, gun.y, target.y) * (map?.size || 0);
  const azimuth = calculateAzimuth(gun.x, target.x, gun.y, target.y);
  const elevation = calculateElevation(distance, projectile.velocity);

  return (
    <>
      <Head>
        <title>MTC Artillery</title>
      </Head>

      <Page>
        {isClient && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                MozBoxDirection: null,
                lg: '1fr minmax(auto, 50%)',
              },
              gap: 4,
            }}
          >
            <Canvas />

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2.5,
              }}
            >
              <Motd message={motd || undefined} />

              <Stack
                spacing={1}
                sx={{
                  '& > div': {
                    alignItems: 'center',
                    height: 35,
                  },
                }}
              >
                <DistanceValue distance={studsToMeters(distance)} />
                <ElevationValue elevation={elevation} />
                <AzimuthValue azimuth={azimuth} />
                <ProjectileSelection />
                <MapSelection />
              </Stack>

              <Typography sx={{ maxWidth: 500 }}>
                Left click to set the gun position. Right click to set the
                target position. Hold middle click to move the map around, and
                scroll wheel to zoom.
              </Typography>

              <Footer version={version} />
            </Box>
          </Box>
        )}
      </Page>
    </>
  );
}
