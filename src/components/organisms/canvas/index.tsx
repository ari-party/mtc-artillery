import Sheet from '@mui/joy/Sheet';
import Image from 'next/image';
import React from 'react';

import FragmentContainer from '@/components/atoms/canvas/FragmentContainer';
import { maps } from '@/constants';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';

export interface Vector {
  x: number;
  y: number;
}

export default function Canvas() {
  const [width, height] = useCanvasStore((s) => [s.width, s.height]);
  const [target, gun] = useDataStore((s) => [s.getTarget(), s.getGun()]);
  const [setTarget, setGun] = useDataStore((s) => [s.setTarget, s.setGun]);
  const ref = React.useRef<HTMLCanvasElement | null>(null);
  const map = maps[useDataStore((s) => s.mapIndex)];

  React.useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, width, height);

    const markerRadius = 8;
    const gunValid = gun.x >= 0 && gun.y >= 0;
    const targetValid = target.x >= 0 && target.y >= 0;

    if (gunValid && targetValid) {
      context.strokeStyle = '#FFF';
      context.beginPath();
      context.moveTo(gun.x * width, gun.y * height);
      context.lineTo(target.x * width, target.y * height);
      context.stroke();
    }

    if (gunValid) {
      context.fillStyle = '#52a8ff';
      context.beginPath();
      context.arc(gun.x * width, gun.y * height, markerRadius, 0, 2 * Math.PI);
      context.fill();
    }

    if (targetValid) {
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
    }

    function clickListener(event: MouseEvent) {
      setGun(event.offsetX / width, event.offsetY / height);
    }

    function contextMenuClickListener(event: MouseEvent) {
      // Opens context menu otherwise, we just want the right click event
      event.preventDefault();

      setTarget(event.offsetX / width, event.offsetY / height);
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
      />

      <FragmentContainer zIndex={2}>
        <canvas ref={ref} height={height} width={width} />
      </FragmentContainer>
    </Sheet>
  );
}
