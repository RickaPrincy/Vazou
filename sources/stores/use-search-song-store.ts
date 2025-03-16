import { create } from 'zustand';

export type UseSearchSongStore = {
  value: string;
  setValue: (value: string) => void;
};

export const useSearchSongStore = create<UseSearchSongStore>(set => ({
  value: '',
  setValue: value => set({ value }),
}));
