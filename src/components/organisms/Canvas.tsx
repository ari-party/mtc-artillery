import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import React from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

import CanvasContainer from '../molecules/canvas/Container';
import AbsoluteContainer from '@/components/atoms/canvas/AbsoluteContainer';
import { maps } from '@/constants';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';

export interface Vector {
  x: number;
  y: number;
}

export default function Canvas() {
  const canvasStore = useCanvasStore();
  const [target, gun] = useDataStore((s) => [s.getTarget(), s.getGun()]);
  const [setTarget, setGun] = useDataStore((s) => [s.setTarget, s.setGun]);
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const isPinching = React.useRef<boolean>(false);
  const map = maps[useDataStore((s) => s.mapIndex)];

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvasStore.width * 2, canvasStore.height * 2);

    const markerRadius = Math.max(16 / canvasStore.zoom, 6);

    // Line
    context.lineWidth = 2;
    context.strokeStyle = '#FFF';
    context.beginPath();
    context.moveTo(
      gun.x * canvasStore.width * 2,
      gun.y * canvasStore.height * 2,
    );
    context.lineTo(
      target.x * canvasStore.width * 2,
      target.y * canvasStore.height * 2,
    );
    context.stroke();

    // Gun
    context.fillStyle = '#52a8ff';
    context.beginPath();
    context.arc(
      gun.x * canvasStore.width * 2,
      gun.y * canvasStore.height * 2,
      markerRadius,
      0,
      Math.PI * 2,
    );
    context.fill();

    // Target
    context.fillStyle = '#ff6666';
    context.beginPath();
    context.arc(
      target.x * canvasStore.width * 2,
      target.y * canvasStore.height * 2,
      markerRadius,
      0,
      Math.PI * 2,
    );
    context.fill();

    async function clickListener(event: MouseEvent) {
      event.preventDefault();

      if (isPinching.current) return;

      console.log(event.button);

      switch (event.button) {
        // LMB
        case 0:
          setGun(
            event.offsetX / (canvasStore.width / 2) / 2,
            event.offsetY / (canvasStore.height / 2) / 2,
          );
          break;

        // RMB
        case 2:
          setTarget(
            event.offsetX / (canvasStore.width / 2) / 2,
            event.offsetY / (canvasStore.height / 2) / 2,
          );
          break;
      }
    }

    canvas.addEventListener('mousedown', clickListener);

    return () => canvas.removeEventListener('mousedown', clickListener);
  });

  return (
    <CanvasContainer>
      <Sheet sx={{ width: canvasStore.width, height: canvasStore.height }}>
        <TransformWrapper
          onZoom={(wrapper) =>
            canvasStore.setZoom(wrapper.instance.transformState.scale)
          }
          onPanningStart={() => {
            isPinching.current = true;
          }}
          onPanningStop={() => {
            isPinching.current = false;
          }}
          panning={{
            allowLeftClickPan: false,
            allowMiddleClickPan: true,
            allowRightClickPan: false,
          }}
        >
          <TransformComponent>
            <Image
              alt={map.name}
              src={map.image}
              priority
              height={canvasStore.height}
              width={canvasStore.width}
              unoptimized
            />

            <AbsoluteContainer zIndex={2}>
              <canvas
                ref={ref}
                height={canvasStore.height * 2}
                width={canvasStore.width * 2}
                onContextMenu={(event) => event.preventDefault()}
                style={{
                  width: canvasStore.width,
                  height: canvasStore.height,
                }}
              />
            </AbsoluteContainer>
          </TransformComponent>
        </TransformWrapper>
      </Sheet>
    </CanvasContainer>
  );
}
