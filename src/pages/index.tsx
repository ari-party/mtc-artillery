import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Head from 'next/head';
import React from 'react';
import { getEntry } from 'strapi-rest';
import { useIsClient } from 'usehooks-ts';

import Page from '@/components/layout/Page';
import AzimuthValue from '@/components/molecules/configuration/Azimuth';
import ElevationValue from '@/components/molecules/configuration/Elevation';
import MapSelection from '@/components/molecules/configuration/Map';
import ProjectileSelection from '@/components/molecules/configuration/Projectile';
import ScrollBox from '@/components/molecules/ScrollBox';
import Canvas from '@/components/organisms/Canvas';
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

      <Page version={version}>
        {motd && (
          <Card
            role="alert"
            sx={{
              marginBottom: 2,
              paddingX: 2,
              maxHeight: '75px',
              overflow: 'auto',
              width: '450px',
            }}
            size="sm"
            variant="soft"
            orientation="horizontal"
          >
            <ScrollBox dependency={motd}>
              <Typography
                sx={{
                  textOverflow: 'ellipsis',
                  whiteSpace: 'wrap',
                  overflowWrap: 'break-word',
                  height: 'fit-content',
                }}
              >
                {motd}
              </Typography>
            </ScrollBox>
          </Card>
        )}

        {isClient && (
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
              <ElevationValue elevation={elevation} />
              <AzimuthValue azimuth={azimuth} />
              <ProjectileSelection />
              <MapSelection />
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
