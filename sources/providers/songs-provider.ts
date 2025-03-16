import * as MediaLibrary from 'expo-media-library';

import { configureCachedProvider } from './utils';
import { Song } from '@/stores';

export const SONGS_CACHE_NAME = 'SONGS-CACHE';
export const songsProvider = configureCachedProvider<Song[]>({
  name: SONGS_CACHE_NAME,
  get: async () => {
    const albums = await MediaLibrary.getAlbumsAsync();
    const audios = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
    });

    return audios.assets.map(asset => {
      const albumInfo = albums.find(album => album.id === asset?.albumId);

      return {
        id: asset.id,
        uri: asset.uri,
        duration: asset.duration,
        filename: asset.filename,
        albumTitle: albumInfo?.title,
        artist: albumInfo?.title,
        albumCoverUri: albumInfo?.type,
      };
    });
  },
});
