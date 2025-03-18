import { getAlbumsAsync } from 'expo-music-library';
import { Song } from '@/stores';
import { configureCachedProvider } from './utils';
import { fetchAssets } from './fetch-assets';

export const SONGS_CACHE_NAME = 'SONGS-CACHE';
export const songsProvider = configureCachedProvider<Song[]>({
  name: SONGS_CACHE_NAME,
  get: async () => {
    const albums = await getAlbumsAsync();
    const audios = await fetchAssets();

    return audios.map(asset => {
      const albumInfo = albums.find(album => album.id === asset?.albumId);

      return {
        id: asset.id,
        uri: asset.uri,
        duration: asset.duration,
        title: asset.title ?? asset.title,
        artist: asset?.artist,
        albumTitle: albumInfo?.title,
        artwork: asset?.artwork,
      };
    });
  },
});
