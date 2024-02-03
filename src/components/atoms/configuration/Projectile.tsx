import todec from '2dec';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React, { useState } from 'react';

import DataContainer from '../DataContainer';
import ScrollBox from '../ScrollBox';
import { projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';

import type { Projectile } from '@/constants';

export default function ProjectileSelection() {
  const [listboxOpen, setListboxOpen] = useState<boolean>(false);
  const [projectileIndex, setProjectileIndex] = useDataStore((s) => [
    s.projectileIndex,
    s.setProjectileIndex,
  ]);

  const projectileCategories: Record<string | 'no_name', Projectile[]> = {
    // Create key in advance so that it always will be #1
    no_name: [],
  };

  for (const projectile of projectiles) {
    const gunName = projectile.gun?.name || 'no_name';
    if (!projectileCategories[gunName]) projectileCategories[gunName] = [];
    projectileCategories[gunName].push(projectile);
  }

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
        listboxOpen={listboxOpen}
        onListboxOpenChange={() => setListboxOpen(true)}
        onClose={() => setListboxOpen(false)}
      >
        <ScrollBox dependency={listboxOpen}>
          {Object.keys(projectileCategories).map((key, categoryIndex) => {
            const items = projectileCategories[key];

            return (
              <React.Fragment key={categoryIndex}>
                <Typography level="body-sm" mt={1} pl={1}>
                  {key !== 'no_name' && key}
                </Typography>

                {items.map((projectile, index) => (
                  <Option
                    key={index}
                    value={projectiles.indexOf(projectile)}
                    label={projectile.name}
                  >
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
              </React.Fragment>
            );
          })}
        </ScrollBox>
      </Select>
    </DataContainer>
  );
}
