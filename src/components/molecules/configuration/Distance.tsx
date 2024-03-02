import todec from '2dec';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/DataContainer';

export default function DistanceValue({ distance }: { distance: number }) {
  return (
    <DataContainer>
      <Typography level="title-md">Distance</Typography>
      <Typography>{todec(distance)} meters</Typography>
    </DataContainer>
  );
}
