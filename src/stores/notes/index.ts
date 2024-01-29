import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

export interface NotesStore {
  notes: string;
  setNotes: (notes: string) => void;
}

export const useNotesStore = create(
  persist(
    immer<NotesStore>((set) => ({
      notes: '',
      setNotes(notes) {
        set((s) => {
          s.notes = notes;
        });
      },
    })),
    {
      name: 'notes',
    },
  ),
);
