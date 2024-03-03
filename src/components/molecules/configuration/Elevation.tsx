import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/DataContainer';
import { useDataStore } from '@/stores/data';

export default function ElevationValue({
  elevation: lowArcElevation,
}: {
  elevation: number;
}) {
  const [gun, target] = useDataStore((s) => [s.getGun(), s.getTarget()]);

  const valid = gun.x >= 0 && gun.y >= 0 && target.x >= 0 && target.y >= 0;

  // Yeah it's just that...
  const highArcElevation = 90 - lowArcElevation;

  return (
    <DataContainer>
      <Typography level="title-md">Elevation</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {valid && lowArcElevation ? (
          <>
            <Typography>{todec(lowArcElevation)}°</Typography>

            <Typography component="b" level="body-sm">
              or
            </Typography>

            <Typography>{todec(highArcElevation)}°</Typography>
          </>
        ) : (
          <Typography>Impossible</Typography>
        )}
      </Stack>
    </DataContainer>
  );
}
