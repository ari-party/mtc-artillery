import Box from '@mui/joy/Box';
import React from 'react';

import { useCanvasStore } from '@/stores/canvas';
import { clamp } from '@/utils/math';

import type { Vector } from '@/components/organisms/canvas';
import type { PropsWithChildren } from 'react';

interface TransformMatrix {
  a: number;
  b: number;
  c: number;
  d: number;
  tx: number;
  ty: number;
}

export default function TraversableContainer({
  children,
  zoomConstraints,
}: PropsWithChildren<{ zoomConstraints: { min: number; max: number } }>) {
  const [width, height] = useCanvasStore((s) => [s.width, s.height]);

  const [transformMatrix, setTransformMatrix] = React.useState<TransformMatrix>(
    {
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0,
    },
  );

  const isInputDown = React.useRef<boolean>(false);
  const mapMousePos = React.useRef<Vector>({ x: 0, y: 0 });

  function validateZoom(z: number) {
    return clamp(z, zoomConstraints.min, zoomConstraints.max);
  }

  function validatePosition(mx: TransformMatrix) {
    // limit positions from going out of bounds
    const { tx, ty } = mx;
    const newTx = clamp(tx, -width * (mx.a - 1), 0);
    const newTy = clamp(ty, -height * (mx.d - 1), 0);

    return { ...mx, tx: newTx, ty: newTy };
  }

  function reset() {
    setTransformMatrix({
      a: 1,
      b: 0,
      c: 0,
      d: 1,
      tx: 0,
      ty: 0,
    });
  }

  function handleInputDown(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (event.button !== 1) return;
    isInputDown.current = true;
  }

  function handleInputUp(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if (event.button !== 1) return;
    if (event.altKey) {
      reset();
    }
    isInputDown.current = false;
  }

  function handleMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    if (!isInputDown.current) return;

    const { movementX, movementY } = event;
    setTransformMatrix((prev) => {
      const newTx = prev.tx + movementX;
      const newTy = prev.ty + movementY;

      const newMx = validatePosition({ ...prev, tx: newTx, ty: newTy });

      return newMx;
    });
  }

  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const { deltaY } = event;
    const zoom = validateZoom(transformMatrix.a - deltaY * 0.001);
    const { x, y } = mapMousePos.current;

    setTransformMatrix((prev) => {
      const newTx = prev.tx - x * (zoom - prev.a);
      const newTy = prev.ty - y * (zoom - prev.d);

      const newMx = validatePosition({
        ...prev,
        a: zoom,
        d: zoom,
        tx: newTx,
        ty: newTy,
      });

      return newMx;
    });
  }

  function handleInnerMouseMove(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) {
    mapMousePos.current = {
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    };
  }

  return (
    <Box
      onMouseDown={(event) => handleInputDown(event)}
      onMouseUp={(event) => handleInputUp(event)}
      onMouseMove={(event) => handleMouseMove(event)}
      onContextMenu={(event) => event.preventDefault()}
      onWheel={(event) => handleWheel(event)}
      sx={{
        width,
        height,
        overflow: 'hidden',
        position: 'relative',
        border: 1,
      }}
    >
      <Box
        onMouseMove={(event) => handleInnerMouseMove(event)}
        sx={{
          position: 'absolute',
          transformOrigin: '0 0',
          transform: `matrix(
              ${transformMatrix.a},
              ${transformMatrix.b},
              ${transformMatrix.c},
              ${transformMatrix.d},
              ${transformMatrix.tx},
              ${transformMatrix.ty}
            )`,
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
