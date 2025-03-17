import { useEffect } from 'react';
import TrackPlayer from 'react-native-track-player';

import { usePlayer } from '@/stores';
import { useLoadingHandler } from '@/hooks';

export const SongPlayer = () => {
  const { song: currentSong, playing: isPlaying } = usePlayer();
  const currentSongUri = currentSong?.uri;
  const { isLoading, startLoading, stopLoading } = useLoadingHandler();

  useEffect(() => {
    (async () => {
      startLoading();
      if (!currentSongUri) {
        return;
      }

      await TrackPlayer.load({
        url: currentSong?.uri,
        artwork: currentSong?.albumCoverUri,
        artist: currentSong?.artist
      });
      stopLoading();
    })();
  }, [currentSongUri]);

  useEffect(() => {
    (async () => {
      if (isPlaying && !isLoading) {
        await TrackPlayer.play();
      } else {
        await TrackPlayer.pause();
      }
    })
  }, [isPlaying, isLoading]);

  return null;
};
