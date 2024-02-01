import todec from '2dec';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../DataContainer';
import { useDataStore } from '@/stores/data';

export default function AzimuthValue({ azimuth }: { azimuth: number }) {
  const [gun, target] = useDataStore((s) => [s.gun, s.target]);

  return (
    <DataContainer>
      <Typography level="title-md">Azimuth</Typography>
      <Typography>
        {gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0
          ? todec(azimuth)
          : 0}
        °
      </Typography>
    </DataContainer>
  );
}
