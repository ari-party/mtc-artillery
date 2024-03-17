import todec from '2dec';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/configuration/DataContainer';
import { useDataStore } from '@/stores/data';

export default function DistanceValue({ distance }: { distance: number }) {
  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const valid = gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0;

  return (
    <DataContainer>
      <Typography level="title-md">Distance</Typography>
      <Typography>
        {valid ? (
          <>
            {todec(distance)}{' '}
            {distance >= 1 && distance < 2 ? 'meter' : 'meters'}
          </>
        ) : (
          'N/A'
        )}
      </Typography>
    </DataContainer>
  );
}
