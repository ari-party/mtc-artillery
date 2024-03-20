import Box from '@mui/joy/Box';
import React from 'react';

import { useCanvasStore } from '@/stores/canvas';
import { clamp } from '@/utils/math';

import type { Vector } from '@/components/organisms/Canvas';
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
  zoomRate,
}: PropsWithChildren<{
  zoomConstraints: { min: number; max: number };
  zoomRate: number;
}>) {
  // Select everything, all variables are fetched anyways (functions don't change)
  const canvasStore = useCanvasStore();
  const [transformMatrix, setTransformMatrix] = React.useState<TransformMatrix>(
    {
      a: canvasStore.zoom,
      b: 0,
      c: 0,
      d: canvasStore.zoom,
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
    // limit the position from going out of bounds
    const { tx, ty } = mx;
    const newTx = clamp(tx, -canvasStore.width * (mx.a - 1), 0);
    const newTy = clamp(ty, -canvasStore.height * (mx.d - 1), 0);

    return { ...mx, tx: newTx, ty: newTy };
  }

  function handleInputUp(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 1) return;

    if (event.altKey) {
      canvasStore.setZoom(1);

      setTransformMatrix({
        a: 1,
        b: 0,
        c: 0,
        d: 1,
        tx: 0,
        ty: 0,
      });
    }

    isInputDown.current = false;
    event.currentTarget.releasePointerCapture(event.pointerId);
  }

  return (
    <Box
      onPointerDown={(event) => {
        if (event.button !== 1) return;

        event.currentTarget.setPointerCapture(event.pointerId);
        isInputDown.current = true;
      }}
      onPointerUp={(event) => handleInputUp(event)}
      onPointerMove={(event) => {
        if (!isInputDown.current) return;

        const { movementX, movementY } = event;

        setTransformMatrix((prev) => {
          const newTx = prev.tx + movementX;
          const newTy = prev.ty + movementY;

          const newMx = validatePosition({ ...prev, tx: newTx, ty: newTy });

          return newMx;
        });
      }}
      onContextMenu={(event) => event.preventDefault()}
      onWheel={(event) => {
        const { deltaY } = event;
        const zoomFactor = deltaY < 0 ? 1 + zoomRate : 1 / (1 + zoomRate);
        const newZoom = validateZoom(transformMatrix.a * zoomFactor);
        const { x, y } = mapMousePos.current;

        canvasStore.setZoom(newZoom);

        setTransformMatrix((prev) => {
          const newTx = prev.tx - x * (newZoom - prev.a);
          const newTy = prev.ty - y * (newZoom - prev.d);

          const newMx = validatePosition({
            ...prev,
            a: newZoom,
            d: newZoom,
            tx: newTx,
            ty: newTy,
          });

          return newMx;
        });
      }}
      sx={{
        width: canvasStore.width,
        height: canvasStore.height,
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <Box
        onPointerMove={(event) => {
          mapMousePos.current = {
            x: event.nativeEvent.offsetX,
            y: event.nativeEvent.offsetY,
          };
        }}
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
