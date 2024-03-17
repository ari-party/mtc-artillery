/* eslint-disable no-underscore-dangle */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { Vector } from '@/components/organisms/canvas';

interface StringVector {
  x: string;
  y: string;
}

export interface DataStore {
  mapIndex: number;
  setMapIndex: (mapIndex: number) => void;

  projectileIndex: number;
  setProjectileIndex: (projectileIndex: number) => void;

  target: StringVector;
  getTarget: () => Vector;
  setTarget: (x: number, y: number) => void;

  gun: StringVector;
  getGun: () => Vector;
  setGun: (x: number, y: number) => void;
}

export const useDataStore = create(
  persist(
    immer<DataStore>((set) => ({
      mapIndex: 0,
      setMapIndex(mapIndex) {
        set((s) => {
          s.mapIndex = mapIndex;
        });
      },

      projectileIndex: 0,
      setProjectileIndex(projectileIndex) {
        set((s) => {
          s.projectileIndex = projectileIndex;
        });
      },

      target: { x: '0.75', y: '0.5' },
      getTarget() {
        return {
          x: Number(this.target.x),
          y: Number(this.target.y),
        };
      },
      setTarget(x, y) {
        set((s) => {
          s.target = {
            x: String(x),
            y: String(y),
          };
        });
      },

      gun: { x: '0.25', y: '0.5' },
      getGun() {
        return {
          x: Number(this.gun.x),
          y: Number(this.gun.y),
        };
      },
      setGun(x, y) {
        set((s) => {
          s.gun = {
            x: String(x),
            y: String(y),
          };
        });
      },
    })),
    {
      name: 'data',
    },
  ),
);
