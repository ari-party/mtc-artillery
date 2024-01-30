import todec from '2dec';
import { Typography } from '@mui/joy';
import React from 'react';

import DataContainer from '../DataContainer';

import type { Vector } from '../Canvas';

export default function ElevationValue({
  gun,
  target,
  elevation,
}: {
  gun: Vector;
  target: Vector;
  elevation: number;
}) {
  return (
    <DataContainer>
      <Typography level="title-md">Elevation</Typography>
      <Typography>
        {gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0
          ? elevation
            ? `${todec(elevation)}°`
            : 'Too far'
          : '0°'}
      </Typography>
    </DataContainer>
  );
}
