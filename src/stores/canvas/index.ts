import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export interface CanvasStore {
  width: number;
  setWidth: (pixels: number) => void;

  height: number;
  setHeight: (pixels: number) => void;

  zoom: number;
  setZoom: (zoom: number) => void;
}

export const useCanvasStore = create(
  immer<CanvasStore>((set) => ({
    width: 0,
    setWidth(pixels) {
      set((s) => {
        s.width = pixels;
      });
    },

    height: 0,
    setHeight(pixels) {
      set((s) => {
        s.height = pixels;
      });
    },

    zoom: 1,
    setZoom(zoom) {
      set((s) => {
        s.zoom = zoom;
      });
    },
  })),
);
