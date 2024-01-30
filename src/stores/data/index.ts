import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import type { Coordinates } from '@/components/atoms/Canvas';

export interface DataStore {
  size: number;
  setSize: (w: number) => void;

  gridTrueSize: number;
  setGridTrueSize: (n: number) => void;

  cellSize: number;
  setCellSize: (n: number) => void;

  distance: number;
  setDistance: (n: number) => void;

  positions: { from?: Coordinates; to?: Coordinates };
  setPositions: (p1: Coordinates, p2: Coordinates) => void;
}

export const useDataStore = create(
  immer<DataStore>((set) => ({
    size: 450,
    setSize(w) {
      set((s) => {
        s.size = w;
      });
    },

    cellSize: 112.5,
    setCellSize(n) {
      set((s) => {
        s.cellSize = n;
      });
    },

    gridTrueSize: 0,
    setGridTrueSize(n) {
      set((s) => {
        s.gridTrueSize = n;
      });
    },

    distance: 0,
    setDistance(n) {
      set((s) => {
        s.distance = n;
      });
    },

    positions: {},
    setPositions(p1, p2) {
      set((s) => {
        s.positions.from = p1;
        s.positions.to = p2;
      });
    },
  })),
);
