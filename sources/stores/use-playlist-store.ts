import debounce, { DebouncedFunction } from 'debounce';

import { PlayList, Song } from './types';
import { createPersistedStore } from './utils';
import { CLICK_BUTTON_DEBOUNCE_MS } from '@/utils/debounce';

export type PlayListStore = {
  playlists: PlayList[];
  getPlayList: DebouncedFunction<(id: string) => Promise<PlayList>>;
  addPlayList: DebouncedFunction<(playList: PlayList) => Promise<void>>;
  deletePlaylist: DebouncedFunction<(id: string) => Promise<void>>;
  updatePlayList: DebouncedFunction<(playList: PlayList) => Promise<void>>;
  addSongsToPlayList: DebouncedFunction<
    (playListId: string, songs: Song[]) => Promise<void>
  >;
  deleteSongsToPlayList: DebouncedFunction<
    (playListId: string, ids: string[]) => Promise<void>
  >;
};
const PLAY_LIST_CACHE_NAME = 'PLAY-LIST-CACHE';
export const usePlayListStore = createPersistedStore<PlayListStore>({
  name: PLAY_LIST_CACHE_NAME,
  state: (set, get) => ({
    playlists: [],
    currentPlayList: null,

    getPlayList: debounce(
      async (id: string) =>
        get().playlists.find(playlist => playlist.id === id)!,
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    addPlayList: debounce(
      async (playlist: PlayList) =>
        set({ playlists: [...get().playlists, playlist] }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    deletePlaylist: debounce(
      async (id: string) =>
        set({
          playlists: get().playlists.filter(playlist => playlist.id !== id),
        }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    updatePlayList: debounce(
      async (updated: PlayList) =>
        set({
          playlists: get().playlists.map(playlist =>
            playlist.id === updated.id ? updated : playlist
          ),
        }),
      CLICK_BUTTON_DEBOUNCE_MS
    ),

    addSongsToPlayList: debounce(async (id: string, songs: Song[]) => {
      const playList = await get().getPlayList(id)!;
      playList.songs = [...playList.songs, ...songs];

      await get().updatePlayList(playList);
    }, CLICK_BUTTON_DEBOUNCE_MS),

    deleteSongsToPlayList: debounce(async (id: string, ids: string[]) => {
      const playList = await get().getPlayList(id)!;
      playList.songs = playList.songs.filter(song => !ids.includes(song.id))!;

      await get().updatePlayList(playList);
    }, CLICK_BUTTON_DEBOUNCE_MS),
  }),
});
