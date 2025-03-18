import debounce from 'debounce';
import { Song } from './types';
import { createPersistedStore } from './utils';
import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';

export type UseFavoritesStore = {
  songs: Song[];
  toggle: (song: Song) => void;
  toggleAll: (songs: Song[]) => void;
  isFavourite: (song: Song) => boolean;
};

export const useFavoritesStore = createPersistedStore<UseFavoritesStore>({
  name: 'FAVOURITES-STORE',
  state: (set, get) => ({
    songs: [],
    toggle: debounce((song: Song) => {
      const { songs = [] } = get();
      const isAlreadyFavourite = songs.some(s => s.id === song?.id);

      set({
        songs: isAlreadyFavourite
          ? songs.filter(s => s.id !== song?.id)
          : [...songs, song],
      });
    }, CLICK_BUTTON_DEBOUNCE_MS),

    toggleAll: (newSongs: Song[]) => {
      const currentSongs = get().songs;
      const allAlreadyFavourite = newSongs.every(song =>
        currentSongs.some(s => s.id === song.id)
      );

      set({
        songs: allAlreadyFavourite
          ? currentSongs.filter(s => !newSongs.some(song => song.id === s.id))
          : [
              ...currentSongs,
              ...newSongs.filter(
                song => !currentSongs.some(s => s.id === song.id)
              ),
            ],
      });
    },

    isFavourite: song => get().songs.some(s => s.id === song?.id),
  }),
});
