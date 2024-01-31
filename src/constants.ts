export interface Map {
  image: string;
  name: string;
  size: number;
}

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

export interface Projectile {
  name: string;
  velocity: number;
}

export const projectiles: Projectile[] = [
  // RSZO-2
  {
    name: 'Rocketet',
    velocity: 150,
  },

  // SAU-2
  {
    name: 'BR-540B',
    velocity: 600,
  },
  {
    name: '3OF25 Low Charge',
    velocity: 125,
  },
  {
    name: '3OF25',
    velocity: 665,
  },

  // Mortar
  {
    name: 'Medium Charge',
    velocity: 172,
  },
  {
    name: 'Low Charge',
    velocity: 125,
  },
  {
    name: 'High Charge',
    velocity: 225,
  },
];
