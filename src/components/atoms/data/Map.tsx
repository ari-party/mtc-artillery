import { Option, Select, Typography } from '@mui/joy';
import React from 'react';

import DataContainer from '../DataContainer';

import type { Map } from '../Canvas';

export default function MapSelection({
  maps,
  setMap,
}: {
  maps: Map[];
  setMap: (map: Map) => void;
}) {
  return (
    <DataContainer>
      <Typography level="title-md">Map</Typography>
      <Select
        onChange={(event, newValue) => {
          setMap(maps[newValue as number]);
        }}
        placeholder="Select a map..."
      >
        {maps.map((item, index) => (
          <Option key={index} value={index}>
            {item.name}
          </Option>
        ))}
      </Select>
    </DataContainer>
  );
}
