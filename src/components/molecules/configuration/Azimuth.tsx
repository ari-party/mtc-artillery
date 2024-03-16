import todec from '2dec';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/configuration/DataContainer';
import { useDataStore } from '@/stores/data';

export default function AzimuthValue({ azimuth }: { azimuth: number }) {
  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const valid = gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0;

  return (
    <DataContainer>
      <Typography level="title-md">Azimuth</Typography>
      <Typography>{valid ? `${todec(azimuth)}°` : 'N/A'}</Typography>
    </DataContainer>
  );
}
