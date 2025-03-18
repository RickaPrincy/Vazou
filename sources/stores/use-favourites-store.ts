import debounce from 'debounce';
import { Song } from './types';
import { createPersistedStore } from './utils';
import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';

export type UseFavouritesStore = {
  songs: Song[];
  toggle: (song: Song) => void;
  isFavourite: (song: Song) => boolean;
};

export const useFavouritesStore = createPersistedStore<UseFavouritesStore>({
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

    isFavourite: song => get().songs.some(s => s.id === song?.id),
  }),
});
