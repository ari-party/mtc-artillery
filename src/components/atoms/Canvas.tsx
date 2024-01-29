import { Sheet } from '@mui/joy';
import { useEffect, useRef, useState } from 'react';

import { useDataStore } from '@/stores/data';

interface Coordinates {
  x: number;
  y: number;
}

function getDistance(x1: number, y1: number, x2: number, y2: number): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function drawGrid(
  width: number,
  height: number,
  cellSize: number,
  context: CanvasRenderingContext2D,
) {
  context.clearRect(0, 0, width, height);

  context.strokeStyle = '#eee';
  context.beginPath();

  for (let x = 0; x <= width; x += cellSize) {
    context.moveTo(x, 0);
    context.lineTo(x, height);
  }

  for (let y = 0; y <= height; y += cellSize) {
    context.moveTo(0, y);
    context.lineTo(width, y);
  }

  context.stroke();
}

export default function Canvas() {
  const { width, height } = useDataStore((s) => ({
    width: s.size,
    height: s.size,
  }));
  const setTrueDistance = useDataStore((s) => s.setDistance);
  const gridTrueSize = useDataStore((s) => s.gridTrueSize);
  const cellSize = useDataStore((s) => s.cellSize);
  const ref = useRef<null | HTMLCanvasElement>(null);

  const [position1, setPosition1] = useState<Coordinates>({ x: -1, y: -1 });
  const [position2, setPosition2] = useState<Coordinates>({ x: -1, y: -1 });

  const markSize = 17.5;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    drawGrid(width, height, cellSize, context);

    if (position1.x !== -1 && position1.y !== -1) {
      context.fillStyle = '#7cacda';
      context.fillRect(
        position1.x - markSize / 2,
        position1.y - markSize / 2,
        markSize,
        markSize,
      );
    }

    if (position2.x !== -1 && position2.y !== -1) {
      context.fillStyle = '#da7c7c';
      context.fillRect(
        position2.x - markSize / 2,
        position2.y - markSize / 2,
        markSize,
        markSize,
      );
    }
    if (
      position1.x !== -1 &&
      position1.y !== -1 &&
      position2.x !== -1 &&
      position2.y !== -1
    ) {
      const distance = getDistance(
        position1.x,
        position1.y,
        position2.x,
        position2.y,
      );

      const trueDistance = (distance / cellSize) * gridTrueSize;

      setTrueDistance(trueDistance);
    }
  }, [
    cellSize,
    height,
    width,
    position1,
    position2,
    setTrueDistance,
    gridTrueSize,
  ]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    canvas.addEventListener('click', (event) => {
      const coordinates: Coordinates = { x: event.offsetX, y: event.offsetY };

      setPosition1(coordinates);
    });

    canvas.addEventListener('contextmenu', (event) => {
      event.preventDefault();

      const coordinates: Coordinates = { x: event.offsetX, y: event.offsetY };

      setPosition2(coordinates);
    });
  }, []);

  return (
    <Sheet sx={{ width, height }}>
      <canvas ref={ref} width={width} height={height} />
    </Sheet>
  );
}
