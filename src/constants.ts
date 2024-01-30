import type { Map } from './components/atoms/Canvas';

/**
 * Size is calculated by multiplying the grid size (in studs) by the amount of grid cells (usually 9)
 */
export const maps: Map[] = [
  {
    image: '/arctic_airbase.jpeg',
    name: 'Arctic Airbase',
    size: 4041,
  },
  {
    image: '/dustbowl.jpeg',
    name: 'Dustbowl',
    size: 3438,
  },
  {
    image: '/powerplant.png',
    name: 'Powerplant',
    size: 3996,
  },
  {
    image: '/radar_station.jpeg',
    name: 'Radar Station',
    size: 6372,
  },
  {
    image: '/roinburg.jpeg',
    name: 'Roinburg',
    size: 3546,
  },
  {
    image: '/sokolokva.jpeg',
    name: 'Sokolokva',
    size: 5004,
  },
];
