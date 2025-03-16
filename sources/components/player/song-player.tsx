import { usePlayer } from '@/stores';
import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';

export const SongPlayer = () => {
  const { song: currentSong, playing: isPlaying } = usePlayer();
  const [loadedSong, setLoadedSong] = useState<Audio.Sound | null>(null);
  const currentSongUri = currentSong?.uri;

  useEffect(() => {
    (async () => {
      if (loadedSong) {
        await loadedSong.unloadAsync();
      }

      if (!currentSongUri) {
        return;
      }

      const { sound } = await Audio.Sound.createAsync(
        { uri: currentSongUri },
        { shouldPlay: isPlaying }
      );
      setLoadedSong(sound);
    })();
  }, [currentSongUri]);

  useEffect(() => {
    if (isPlaying) {
      loadedSong?.playAsync();
    } else {
      loadedSong?.pauseAsync();
    }
  }, [isPlaying]);

  return null;
};
