import { Box, Sheet, Typography } from '@mui/joy';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { maps } from '@/constants';
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
  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,

        width: 450,
        height: 450,

        zIndex,
      }}
    >
      {children}
    </Box>
  );
}

export default function Canvas() {
  const mapIndex = useDataStore((s) => s.mapIndex);
  const map = maps[mapIndex];
  const [target, gun] = useDataStore((s) => [s.target, s.gun]);
  const [setTarget, setGun] = useDataStore((s) => [s.setTarget, s.setGun]);
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const markerRadius = 8;
    const gunValid = gun.x >= 0 && gun.y >= 0;
    const targetValid = target.x >= 0 && target.y >= 0;

    if (gunValid && targetValid) {
      context.strokeStyle = '#FFF';
      context.beginPath();
      context.moveTo(gun.x, gun.y);
      context.lineTo(target.x, target.y);
      context.stroke();
    }

    if (gunValid) {
      context.fillStyle = '#52a8ff';
      context.beginPath();
      context.arc(gun.x, gun.y, markerRadius, 0, 2 * Math.PI);
      context.fill();
    }

    if (targetValid) {
      context.fillStyle = '#ff6666';
      context.beginPath();
      context.arc(target.x, target.y, markerRadius, 0, 2 * Math.PI);
      context.fill();
    }

    function clickListener(event: MouseEvent) {
      setGun(event.offsetX, event.offsetY);
    }

    function contextMenuClickListener(event: MouseEvent) {
      event.preventDefault();

      setTarget(event.offsetX, event.offsetY);
    }

    canvas.addEventListener('click', clickListener);
    canvas.addEventListener('contextmenu', contextMenuClickListener);

    return () => {
      canvas.removeEventListener('click', clickListener);
      canvas.removeEventListener('contextmenu', contextMenuClickListener);
    };
  });

  return (
    <Sheet sx={{ width: 450, height: 450 }}>
      {map ? (
        <>
          <FragmentContainer zIndex={1}>
            <Image alt={map.name} src={map.image} quality={100} priority fill />
          </FragmentContainer>

          <FragmentContainer zIndex={2}>
            <canvas ref={ref} height={450} width={450} />
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
