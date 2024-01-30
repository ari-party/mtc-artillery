import { Box, Textarea } from '@mui/joy';

import { useNotesStore } from '@/stores/notes';

export default function Notes() {
  const { notes, setNotes } = useNotesStore();

  return (
    <Box>
      <Textarea
        placeholder="Notes"
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
        sx={{
          height: '100%',
          width: '100%',
          minWidth: { md: '300px', lg: '450px' },
          minHeight: '100px',
        }}
      />
    </Box>
  );
}
