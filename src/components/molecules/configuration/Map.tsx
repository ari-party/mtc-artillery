import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Typography from '@mui/joy/Typography';
import React from 'react';

import DataContainer from '../../atoms/DataContainer';
import ScrollBox from '../ScrollBox';
import { maps } from '@/constants';
import { useDataStore } from '@/stores/data';

export default function MapSelection() {
  const [listboxOpen, setListboxOpen] = React.useState<boolean>(false);
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
        listboxOpen={listboxOpen}
        onListboxOpenChange={() => setListboxOpen(true)}
        onClose={() => setListboxOpen(false)}
      >
        <ScrollBox dependency={listboxOpen}>
          {maps.map((item, index) => (
            <Option key={index} value={index}>
              {item.name}
            </Option>
          ))}
        </ScrollBox>
      </Select>
    </DataContainer>
  );
}
