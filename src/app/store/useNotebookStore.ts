import { create } from 'zustand';

type Note = { id: number; title: string; content: string };

type Store = {
  notes: Note[];
  addNote: (title: string, content: string) => void;
};

export const useNotebookStore = create<Store>((set) => ({
  notes: [],
  addNote: (title, content) =>
    set((state) => ({
      notes: [...state.notes, { id: Date.now(), title, content }],
    })),
}));
