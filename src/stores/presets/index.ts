import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import type { DataStore } from '../data';

export interface Preset {
  name: string;
  description?: string;
  data: DataStore;
}

export interface PresetStore {
  presets: Preset[];
  addPreset: (preset: Preset) => void;
  deletePreset: (presetIndex: number) => void;
}

export const usePresetStore = create(
  persist(
    immer<PresetStore>((set) => ({
      presets: [],
      addPreset(preset) {
        set((s) => {
          s.presets.push(preset);
        });
      },
      deletePreset(presetIndex) {
        set((s) => {
          s.presets = s.presets.filter((_, index) => index !== presetIndex);
        });
      },
    })),
    {
      name: 'presets',
    },
  ),
);
