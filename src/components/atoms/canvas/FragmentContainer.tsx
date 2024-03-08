import Box from '@mui/joy/Box';

import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function FragmentContainer({
  children,
  zIndex,
}: PropsWithChildren<{ zIndex: number }>) {
  const [width, height] = useCanvasStore((s) => [s.width, s.height]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,

        width,
        height,

        zIndex,
      }}
    >
      {children}
    </Box>
  );
}
