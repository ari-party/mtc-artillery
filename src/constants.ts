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

export interface Gun {
  name?: string;
  minimumElevation?: number;
  maximumElevation?: number;
}

export const guns: Record<string, Gun> = {
  'rszo-2': {
    name: 'RSZO-2',
  },

  'sau-2': {
    name: 'SAU-2',
  },

  mortar: {
    name: 'Mortar',
  },
};

export interface Projectile {
  name: string;
  velocity: number;
  gun?: Gun;
}

export const projectiles: Projectile[] = [
  // RSZO-2
  {
    name: 'Rocketetet',
    velocity: 150,
    gun: guns['rszo-2'],
  },

  // SAU-2
  {
    name: '3OF25 Low Charge',
    velocity: 125,
    gun: guns['sau-2'],
  },

  // Mortar
  {
    name: 'Medium Charge',
    velocity: 172,
    gun: guns.mortar,
  },
  {
    name: 'Low Charge',
    velocity: 125,
    gun: guns.mortar,
  },
  {
    name: 'High Charge',
    velocity: 225,
    gun: guns.mortar,
  },
];
