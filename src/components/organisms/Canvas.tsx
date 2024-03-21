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
  const isPanning = React.useRef<boolean>(false);
  const map = maps[useDataStore((s) => s.mapIndex)];

  const canvasScale = 8;
  const scaledWidth = canvasStore.width * canvasScale;
  const scaledHeight = canvasStore.height * canvasScale;

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, scaledWidth, scaledHeight);

    // Line
    context.lineWidth = (1.75 * canvasScale) / canvasStore.zoom;
    context.strokeStyle = '#FFF';
    context.beginPath();
    context.moveTo(gun.x * scaledWidth, gun.y * scaledHeight);
    context.lineTo(target.x * scaledWidth, target.y * scaledHeight);
    context.stroke();

    const markerRadius = Math.max(
      (8 * canvasScale) / canvasStore.zoom,
      4 * (canvasScale / 2),
    );

    // Gun
    context.fillStyle = '#52a8ff';
    context.beginPath();
    context.arc(
      gun.x * scaledWidth,
      gun.y * scaledHeight,
      markerRadius,
      0,
      Math.PI * 2,
    );
    context.fill();

    // Target
    context.fillStyle = '#ff6666';
    context.beginPath();
    context.arc(
      target.x * scaledWidth,
      target.y * scaledHeight,
      markerRadius,
      0,
      Math.PI * 2,
    );
    context.fill();

    async function clickListener(event: MouseEvent) {
      event.preventDefault();

      if (isPanning.current) return;

      switch (event.button) {
        // LMB
        case 0:
          setGun(
            event.offsetX / (canvasStore.width / canvasScale) / canvasScale,
            event.offsetY / (canvasStore.height / canvasScale) / canvasScale,
          );
          break;

        // RMB
        case 2:
          setTarget(
            event.offsetX / (canvasStore.width / canvasScale) / canvasScale,
            event.offsetY / (canvasStore.height / canvasScale) / canvasScale,
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
            // Don't allow setting gun/target when panning
            isPanning.current = true;
          }}
          onPanningStop={() => {
            isPanning.current = false;
          }}
          panning={{
            allowLeftClickPan: false,
            allowMiddleClickPan: true,
            allowRightClickPan: false,
            velocityDisabled: true,
          }}
          wheel={{
            step: 0.1,
          }}
          alignmentAnimation={{
            animationTime: 350,
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
                width={scaledWidth}
                height={scaledHeight}
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
