import { create } from 'zustand';
import debounce from 'debounce';

import { PlayList, Song } from './types';
import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';
import { songsProvider } from '@/providers';

export type UseSongPlayer = {
  playing: boolean;
  song: Song | null;
  playlist: PlayList | null;
  setSong: (song: Song | null) => void;
  setPlayList: (playlist: PlayList | null) => void;
  setCurrent: (args: { song: Song | null; playlist: PlayList | null }) => void;
  toggle: () => void;
  pause: () => void;
  stop: () => void;
  play: () => void;
  next: () => void;
  prev: () => void;
};

// DEBOUNCED SONG PLAYER
export const usePlayer = create<UseSongPlayer>((set, get) => {
  const getSongs = async () => {
    const { playlist } = get();
    return playlist ? playlist.songs : songsProvider.get();
  };

  const getCurrentIndex = (songs: Song[]) => {
    const { song } = get();
    return song ? songs.findIndex(s => s.id === song.id) : -1;
  };

  return {
    playing: false,
    song: null,
    playlist: null,

    play: debounce(() => set({ playing: true }), CLICK_BUTTON_DEBOUNCE_MS),
    pause: debounce(() => set({ playing: false }), CLICK_BUTTON_DEBOUNCE_MS),
    toggle: debounce(
      () => set(state => ({ playing: !state.playing })),
      CLICK_BUTTON_DEBOUNCE_MS
    ),
    stop: debounce(
      () => set({ playing: false, song: null, playlist: null }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    setSong: debounce(
      song => set({ song, playing: true }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    setPlayList: debounce(
      playlist => set({ playlist, song: playlist.songs[0] ?? null }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    setCurrent: debounce(
      ({ song, playlist }) => set({ playing: true, song, playlist }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    prev: debounce(async () => {
      const songs = await getSongs();
      const currentIndex = getCurrentIndex(songs);
      if (currentIndex <= 0) return;

      set({ song: songs[currentIndex - 1], playing: true });
    }, CLICK_BUTTON_DEBOUNCE_MS),

    next: debounce(async () => {
      const songs = await getSongs();
      const currentIndex = getCurrentIndex(songs);
      if (currentIndex < 0 || currentIndex >= songs.length - 1) return;

      set({ song: songs[currentIndex + 1], playing: true });
    }, CLICK_BUTTON_DEBOUNCE_MS),
  };
});
