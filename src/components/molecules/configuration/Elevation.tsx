import todec from '2dec';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/configuration/DataContainer';

export default function ElevationValue({
  elevation: lowArcElevation,
}: {
  elevation: number;
}) {
  // Yeah it's just that...
  const highArcElevation = 90 - lowArcElevation;

  return (
    <DataContainer>
      <Typography level="title-md">Elevation</Typography>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        {lowArcElevation ? (
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
