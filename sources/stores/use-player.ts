import { create } from 'zustand';
import debounce from 'debounce';

import { PlayList, Song } from './types';
import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';
import { songsProvider } from '@/providers';
import TrackPlayer from 'react-native-track-player';

export type UseSongPlayer = {
  playing: boolean;
  song: Song | null;
  playlist: PlayList | null;
  random: boolean;
  setSong: (song: Song | null) => void;
  seekTo: (value: number) => Promise<void>;
  setPlayList: (playlist: PlayList | null) => void;
  setCurrent: (args: { song: Song | null; playlist: PlayList | null }) => void;
  toggle: () => void;
  pause: () => void;
  stop: () => void;
  play: () => void;
  next: () => void;
  prev: () => void;
  toggleRandom: () => void;
};

export const usePlayer = create<UseSongPlayer>((set, get) => {
  const getSongs = async () => {
    const { playlist } = get();
    return playlist ? playlist.songs : songsProvider.get();
  };

  const getCurrentIndex = (songs: Song[]) => {
    const { song } = get();
    return song ? songs.findIndex(s => s.id === song.id) : -1;
  };

  const getRandomSong = (songs: Song[], excludeIndex: number) => {
    if (songs.length <= 1) return songs[0];
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * songs.length);
    } while (randomIndex === excludeIndex);
    return songs[randomIndex];
  };

  return {
    playing: false,
    song: null,
    playlist: null,
    random: false,

    toggleRandom: () => set(state => ({ random: !state.random })),

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

    setPlayList: debounce(async (playlist: PlayList | null) => {
      set({ playlist });

      if (playlist && get().random) {
        const randomSong = getRandomSong(playlist.songs, -1);
        set({ song: randomSong, playing: true });
      } else {
        set({
          song: playlist?.songs[0] ?? null,
          playing: (playlist?.songs.length ?? 0) > 0 ? true : false,
        });
      }
    }, CLICK_BUTTON_DEBOUNCE_MS),

    setCurrent: debounce(
      ({ song, playlist }) => set({ playing: true, song, playlist }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    prev: debounce(async () => {
      const songs = await getSongs();
      const currentIndex = getCurrentIndex(songs);
      const { random } = get();

      if (random) {
        const randomSong = getRandomSong(songs, currentIndex);
        set({ song: randomSong, playing: true });
        return;
      }

      if (currentIndex <= 0) return;

      set({ song: songs[currentIndex - 1], playing: true });
    }, CLICK_BUTTON_DEBOUNCE_MS),

    next: debounce(async () => {
      const songs = await getSongs();
      const currentIndex = getCurrentIndex(songs);
      const { random } = get();

      if (random) {
        const randomSong = getRandomSong(songs, currentIndex);
        set({ song: randomSong, playing: true });
        return;
      }

      if (currentIndex < 0 || currentIndex >= songs.length - 1) return;

      set({ song: songs[currentIndex + 1], playing: true });
    }, CLICK_BUTTON_DEBOUNCE_MS),
    seekTo: async (value: number) => {
      await TrackPlayer.seekTo(value);
    },
  };
});
