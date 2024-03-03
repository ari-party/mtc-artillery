import Box from '@mui/joy/Box';
import React, { useEffect } from 'react';

import Canvas from '../organisms/Canvas';
import { useCanvasStore } from '@/stores/canvas';

export default function CanvasContainer() {
  const [setHeight, setWidth] = useCanvasStore((s) => [
    s.setHeight,
    s.setWidth,
  ]);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    function updateDimensions() {
      if (!containerRef.current) return;

      setHeight(containerRef.current.offsetHeight);
      setWidth(containerRef.current.offsetWidth);
    }

    updateDimensions();

    new ResizeObserver(updateDimensions).observe(containerRef.current);
  });

  return (
    <Box ref={containerRef} sx={{ aspectRatio: '1/1' }}>
      <Canvas />
    </Box>
  );
}
