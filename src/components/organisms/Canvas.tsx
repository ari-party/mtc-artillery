import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { maps } from '@/constants';
import { useCanvasStore } from '@/stores/canvas';
import { useDataStore } from '@/stores/data';

import type { PropsWithChildren } from 'react';

export interface Vector {
  x: number;
  y: number;
}

function FragmentContainer({
  children,
  zIndex,
}: PropsWithChildren<{ zIndex: number }>) {
  const [width, height] = useCanvasStore((s) => [s.width, s.height]);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,

        width,
        height,

        zIndex,
      }}
    >
      {children}
    </Box>
  );
}

export default function Canvas() {
  const [width, height] = useCanvasStore((s) => [s.width, s.height]);
  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];
  const [target, gun] = useDataStore((s) => [s.getTarget(), s.getGun()]);
  const [setTarget, setGun] = useDataStore((s) => [s.setTarget, s.setGun]);
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
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
      {map ? (
        <>
          <FragmentContainer zIndex={1}>
            <Image
              alt={map.name}
              src={map.image}
              priority
              height={height}
              width={width}
            />
          </FragmentContainer>

          <FragmentContainer zIndex={2}>
            <canvas ref={ref} height={height} width={width} />
          </FragmentContainer>
        </>
      ) : (
        <Typography
          sx={{
            height: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          level="title-lg"
        >
          Please select a map.
        </Typography>
      )}
    </Sheet>
  );
}
