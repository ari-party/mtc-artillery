import Box from '@mui/joy/Box';
import React from 'react';

import { useCanvasStore } from '@/stores/canvas';

import type { Vector } from '@/components/organisms/canvas';
import type { PropsWithChildren } from 'react';

export default function TraversableContainer({
  children,
  zoomConstraints,
}: PropsWithChildren<{ zoomConstraints: { min: number; max: number } }>) {
  const [width, height] = useCanvasStore((s) => [s.width, s.height]);

  const [position, setPosition] = React.useState<Vector>({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState<number>(1);
  const isMouseDown = React.useRef<boolean>(false);

  function validateZoom(z: number) {
    return Math.max(zoomConstraints.min, Math.min(zoomConstraints.max, z));
  }


  function handleInputDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (event.button !== 1) return;
    isMouseDown.current = true;
  }

  function handleInputUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.button !== 1) return;
    isMouseDown.current = false;
  }

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (!isMouseDown.current) return;

    const { movementX, movementY } = event;
    setPosition((p) => ({
      x: p.x + movementX,
      y: p.y + movementY,
    }));
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const { deltaY } = event;
    const newZoom = validateZoom(zoom - deltaY / 1000);
    setZoom(newZoom);
  }

  return (
    <Box
      onMouseDown={(event) => handleInputDown(event)}
      onMouseUp={(event) => handleInputUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}
      onContextMenu={(event) => event.preventDefault()}
      onWheel={(event) => handleWheel(event)}
      sx={{ width, height, overflow: 'hidden', position: 'relative' }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          transform: `scale(${zoom})`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
