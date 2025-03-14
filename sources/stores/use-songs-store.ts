import { Song } from '@/providers';
import { createPersistedStore } from './utils';

export type SongsStore = {
  songs: Song[];
  setSongs: (songs: Song[]) => void;
};

const SONGS_CACHE_NAME = 'SONGS_CACHE';
export const useSongsStore = createPersistedStore<SongsStore>({
  name: SONGS_CACHE_NAME,
  state: set => ({
    songs: [],
    setSongs: songs => set({ songs }),
  }),
});
