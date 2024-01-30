import todec from '2dec';
import { Typography } from '@mui/joy';
import React from 'react';

import DataContainer from '../DataContainer';

import type { Vector } from '../Canvas';

export default function AzimuthValue({
  gun,
  target,
  azimuth,
}: {
  gun: Vector;
  target: Vector;
  azimuth: number;
}) {
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
