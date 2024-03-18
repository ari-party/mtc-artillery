import Box from '@mui/joy/Box';
import React from 'react';

import TraversableContainer from './TraversableContainer';
import Canvas from '../../organisms/canvas';
import { useCanvasStore } from '@/stores/canvas';

export default function CanvasContainer() {
  const [setHeight, setWidth] = useCanvasStore((s) => [
    s.setHeight,
    s.setWidth,
  ]);
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    function updateDimensions() {
      if (!element) return;

      setHeight(element.offsetHeight);
      setWidth(element.offsetWidth);
    }

    updateDimensions();

    const observer = new ResizeObserver(updateDimensions);
    observer.observe(element);
    return () => observer.disconnect();
  });

  return (
    <Box ref={ref} sx={{ aspectRatio: '1/1', outline: 1 }}>
      <TraversableContainer zoomConstraints={{ min: 1, max: 4 }}>
        <Canvas />
      </TraversableContainer>
    </Box>
  );
}
