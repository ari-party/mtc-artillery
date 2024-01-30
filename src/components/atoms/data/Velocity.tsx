import { Input, Typography } from '@mui/joy';
import React from 'react';

import DataContainer from '../DataContainer';

export default function VelocityInput({
  velocity,
  setVelocity,
}: {
  velocity: number;
  setVelocity: (v: number) => void;
}) {
  return (
    <DataContainer>
      <Typography level="title-md">Velocity</Typography>
      <Input
        color="neutral"
        size="sm"
        variant="soft"
        type="text"
        sx={{ width: '90px' }}
        endDecorator={<Typography level="body-sm">(m/s)</Typography>}
        value={velocity}
        onChange={(event) => {
          const { value } = event.target;
          if (/^[0-9]+$/.test(value)) setVelocity(Number(value));
        }}
      />
    </DataContainer>
  );
}
