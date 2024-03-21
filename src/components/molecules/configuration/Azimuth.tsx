import todec from '2dec';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/configuration/DataContainer';

export default function AzimuthValue({ azimuth }: { azimuth: number }) {
  return (
    <DataContainer>
      <Typography level="title-md">Azimuth</Typography>
      <Typography>{`${todec(azimuth)}°`}</Typography>
    </DataContainer>
  );
}
