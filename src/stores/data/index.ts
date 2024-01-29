import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface DataStore {
  size: number;
  setSize: (w: number) => void;

  gridTrueSize: number;
  setGridTrueSize: (n: number) => void;

  distance: number;
  setDistance: (n: number) => void;
}

export const useDataStore = create(
  immer<DataStore>((set) => ({
    size: 450,
    setSize(w) {
      set((s) => {
        s.size = w;
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
  })),
);
