import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Map, Vector } from '@/components/atoms/Canvas';

export interface DataStore {
  map?: Map;
  setMap: (map: Map) => void;

  velocity: number;
  setVelocity: (v: number) => void;

  target: Vector;
  setTarget: (x: number, y: number) => void;

  gun: Vector;
  setGun: (x: number, y: number) => void;
}

export const useDataStore = create(
  persist(
    immer<DataStore>((set) => ({
      map: undefined,
      setMap(map) {
        set((s) => {
          s.map = map;
        });
      },

      velocity: 125,
      setVelocity(v) {
        set((s) => {
          s.velocity = v;
        });
      },

      target: { x: -1, y: -1 },
      setTarget(x, y) {
        set((s) => {
          s.target = { x, y };
        });
      },

      gun: { x: -1, y: -1 },
      setGun(x, y) {
        set((s) => {
          s.gun = { x, y };
        });
      },
    })),
    {
      name: 'data',
    },
  ),
);
