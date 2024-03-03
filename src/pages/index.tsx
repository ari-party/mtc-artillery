import Box from '@mui/joy/Box';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';
import { getEntry } from 'strapi-rest';
import { useIsClient } from 'usehooks-ts';

import BMACIcon from '@/components/atoms/icons/BMAC';
import GitHubIcon from '@/components/atoms/icons/GitHub';
import Page from '@/components/layout/Page';
import AzimuthValue from '@/components/molecules/configuration/Azimuth';
import DistanceValue from '@/components/molecules/configuration/Distance';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import Canvas from '@/components/organisms/Canvas';
import Motd from '@/components/organisms/Motd';
import { maps, projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';
import {
  calculateAzimuth,
  calculateDistance,
  calculateElevation,
} from '@/utils/math';

import type { GetStaticPropsResult, InferGetStaticPropsType } from 'next';

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ version: string; motd: string | null }>
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
      /* empty */
      // Don't handle error
    }
  }

  return { props: { version, motd: motd || null }, revalidate: 120 };
}

export default function Index({
  version,
  motd,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isClient = useIsClient();
  const [mapIndex, setMapIndex] = useDataStore((s) => [
    s.mapIndex,
    s.setMapIndex,
  ]);
  const map = maps[mapIndex];
  const [projectileIndex, setProjectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);
  const projectile = projectiles[projectileIndex];
  const [gun, target] = useDataStore((s) => [s.gun, s.target]);

  // Map index doesn't correspond to anything, so reset it
  if (!map) return setMapIndex(0);
  // Projectile index doesn't correspond to anything, so reset it
  if (!projectile) return setProjectileIndex(0);

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
        {isClient && (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: {
                sm: null,
                md: 'min-content 1fr',
              },
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Canvas />
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {motd && <Motd message={motd} />}

              <Stack
                spacing={1}
                sx={{
                  '& > div': {
                    alignItems: 'center',
                    height: 35,
                  },
                }}
              >
                <DistanceValue distance={distance / 2.8} />
                <ElevationValue elevation={elevation} />
                <AzimuthValue azimuth={azimuth} />
                <ProjectileSelection />
                <MapSelection />
              </Stack>

              <Typography>
                Left click to set the gun position. Right click to set the
                target position.
              </Typography>

              <Stack
                direction="row"
                spacing={1}
                sx={{
                  marginTop: 'auto',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Stack
                  direction="row"
                  spacing={0.5}
                  sx={{ alignItems: 'center' }}
                >
                  <NextLink
                    href="https://github.com/ari-party/mtc-artillery"
                    target="_blank"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <GitHubIcon />
                  </NextLink>

                  <NextLink
                    href="https://www.buymeacoffee.com/valk"
                    target="_blank"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <BMACIcon />
                  </NextLink>
                </Stack>

                <Typography
                  level="body-sm"
                  component="code"
                  sx={(theme) => ({ fontFamily: theme.fontFamily.code })}
                >
                  {version}
                </Typography>
              </Stack>
            </Box>
          </Box>
        )}
      </Page>
    </>
  );
}
