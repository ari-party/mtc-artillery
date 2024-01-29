import { Box, Textarea } from '@mui/joy';

import { useNotesStore } from '@/stores/notes';

export default function Notes() {
  const { notes, setNotes } = useNotesStore();

  return (
    <Box>
      <Textarea
        value={notes}
        onChange={(event) => {
          setNotes(event.target.value);
        }}
        sx={{
          height: '100%',
          width: '100%',
          minWidth: '300px',
          minHeight: '100px',
        }}
      />
    </Box>
  );
}
