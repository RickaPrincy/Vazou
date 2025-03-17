import * as ExpoMusicLibrary from 'expo-music-library';

import { Song } from '@/stores';
import { configureCachedProvider } from './utils';

export const SONGS_CACHE_NAME = 'SONGS-CACHE';
export const songsProvider = configureCachedProvider<Song[]>({
  name: SONGS_CACHE_NAME,
  get: async () => {
    const audios = await ExpoMusicLibrary.getAssetsAsync();
    const albums = await ExpoMusicLibrary.getAlbumsAsync();

    return audios.assets.map(asset => {
      const albumInfo = albums.find(album => album.id === asset?.albumId);

      return {
        id: asset.id,
        uri: asset.uri,
        duration: asset.duration,
        filename: asset.filename,
        artist: asset?.artist,
        albumTitle: albumInfo?.title,
        albumCoverUri: albumInfo?.artwork,
      };
    });
  },
});
