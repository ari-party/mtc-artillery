// Gravity
const G = 9.8;

export function calculateElevation(d: number, v: number): number {
  const angle = 0.5 * Math.asin((d * 0.35 * G * 1.8) / v ** 2);
  return (angle * 180) / Math.PI;
}

export function calculateAzimuth(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
): number {
  return Math.abs(
    // 90° offset
    (90 + (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI + 360) % 360,
  );
}

export function calculateDistance(
  x1: number,
  x2: number,
  y1: number,
  y2: number,
): number {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
