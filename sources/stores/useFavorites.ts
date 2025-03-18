import { create } from 'zustand';

type Song = {
  id: string;
  title: string;
  artist: string;
  artwork: string;
};

type FavoritesStore = {
  favorites: Song[];
  toggleFavorite: (song: Song) => void;
};

export const useFavorites = create<FavoritesStore>((set, get) => ({
  favorites: [],
  toggleFavorite: song => {
    set(state => {
      const isFavorite = state.favorites.some(fav => fav.id === song.id);
      return {
        favorites: isFavorite
          ? state.favorites.filter(fav => fav.id !== song.id)
          : [...state.favorites, song],
      };
    });
  },
}));
