import todec from '2dec';
import { Option, Select, Stack, Typography } from '@mui/joy';
import React from 'react';

import DataContainer from '../DataContainer';
import { projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';

export default function ProjectileSelection() {
  const [projectileIndex, setProjectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);

  return (
    <DataContainer>
      <Typography level="title-md">Projectile</Typography>
      <Select
        value={projectileIndex}
        onChange={(event, newValue) => setProjectileIndex(newValue as number)}
        placeholder="Select a projectile..."
        slotProps={{
          listbox: {
            placement: 'top-end',
          },
        }}
      >
        {projectiles.map((projectile, index) => (
          <Option key={index} value={index} label={projectile.name}>
            <Stack
              sx={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 2,
              }}
            >
              <Typography>{projectile.name}</Typography>
              <Typography level="body-sm">
                {todec(projectile.velocity)} m/s
              </Typography>
            </Stack>
          </Option>
        ))}
      </Select>
    </DataContainer>
  );
}
