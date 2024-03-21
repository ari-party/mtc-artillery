import Box from '@mui/joy/Box';
import React from 'react';

import { useCanvasStore } from '@/stores/canvas';

import type { PropsWithChildren } from 'react';

export default function CanvasContainer({ children }: PropsWithChildren) {
  const [setWidth, setHeight] = useCanvasStore((s) => [
    s.setWidth,
    s.setHeight,
  ]);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function updateDimensions() {
      if (!element) return;

      setWidth(element.offsetWidth);
      setHeight(element.offsetHeight);
    }

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);
    return () => observer.disconnect();
  });

  return (
    <Box ref={ref} sx={{ aspectRatio: '1/1', outline: 1 }}>
      {children}
    </Box>
  );
}
