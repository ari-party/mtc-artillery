import todec from '2dec';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/DataContainer';
import { projectiles } from '@/constants';
import { useDataStore } from '@/stores/data';

export default function ElevationValue({ elevation }: { elevation: number }) {
  const [gun, target] = useDataStore((s) => [s.gun, s.target]);
  const projectileIndex = useDataStore((s) => s.projectileIndex);
  const projectile = projectiles[projectileIndex];

  const valid = gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0;
  const canFire = projectile.gun
    ? elevation >= (projectile.gun.minimumElevation || 0) &&
      elevation <= (projectile.gun.maximumElevation || 45)
    : true;

  return (
    <DataContainer>
      <Typography level="title-md">Elevation</Typography>
      <Typography>
        {valid
          ? elevation && canFire
            ? `${todec(elevation)}°`
            : 'Impossible'
          : '0°'}
      </Typography>
    </DataContainer>
  );
}
