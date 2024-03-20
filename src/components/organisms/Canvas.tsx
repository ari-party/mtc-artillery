import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import React from 'react';

import AbsoluteContainer from '@/components/atoms/canvas/AbsoluteContainer';
import { maps } from '@/constants';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';

export interface Vector {
  x: number;
  y: number;
}

export default function Canvas() {
  const [width, height, zoom] = useCanvasStore((s) => [
    s.width,
    s.height,
    s.zoom,
  ]);
  const [target, gun] = useDataStore((s) => [s.getTarget(), s.getGun()]);
  const [setTarget, setGun] = useDataStore((s) => [s.setTarget, s.setGun]);
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const map = maps[useDataStore((s) => s.mapIndex)];

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, width * 2, height * 2);

    const markerRadius = zoom <= 1.5 ? 16 : 8;

    // Line
    context.lineWidth = 2;
    context.strokeStyle = '#FFF';
    context.beginPath();
    context.moveTo(gun.x * width, gun.y * height);
    context.lineTo(target.x * width, target.y * height);
    context.stroke();

    // Gun
    context.fillStyle = '#52a8ff';
    context.beginPath();
    context.arc(gun.x * width, gun.y * height, markerRadius, 0, 2 * Math.PI);
    context.fill();

    // Target
    context.fillStyle = '#ff6666';
    context.beginPath();
    context.arc(
      target.x * width,
      target.y * height,
      markerRadius,
      0,
      2 * Math.PI,
    );
    context.fill();

    function clickListener(event: MouseEvent) {
      setGun(event.offsetX / (width / 2), event.offsetY / (height / 2));
    }

    function contextMenuClickListener(event: MouseEvent) {
      // Opens context menu otherwise, we just want the right click event
      event.preventDefault();

      setTarget(event.offsetX / (width / 2), event.offsetY / (height / 2));
    }

    canvas.addEventListener('click', clickListener);
    canvas.addEventListener('contextmenu', contextMenuClickListener);

    return () => {
      canvas.removeEventListener('click', clickListener);
      canvas.removeEventListener('contextmenu', contextMenuClickListener);
    };
  });

  return (
    <Sheet sx={{ width, height }}>
      <Image
        alt={map.name}
        src={map.image}
        priority
        height={height}
        width={width}
        unoptimized
      />

      <AbsoluteContainer zIndex={3}>
        <canvas
          ref={ref}
          height={height * 2}
          width={width * 2}
          style={{ height, width }}
        />
      </AbsoluteContainer>
    </Sheet>
  );
}
