import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../DataContainer';
import { maps } from '@/constants';
import { useDataStore } from '@/stores/data';

export default function MapSelection() {
  const [mapIndex, setMapIndex] = useDataStore((s) => [
    s.mapIndex,
    s.setMapIndex,
  ]);

  return (
    <DataContainer>
      <Typography level="title-md">Map</Typography>
      <Select
        value={mapIndex}
        onChange={(event, newValue) => setMapIndex(newValue as number)}
        placeholder="Select a map..."
        slotProps={{
          listbox: {
            placement: 'top-end',
          },
        }}
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
