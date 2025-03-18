import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

import { FlexView, Screen } from '@/components';
import { SongList } from '@/components/song-list';
import { Header } from '@/components/header';
import { Button, IconButton } from '@/components/buttons';
import { usePlayer, usePlayListStore } from '@/stores';
import { usePalette } from '@/themes';

export const PlayListShowScreen = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const {
    playing: isPlaying,
    toggle,
    setPlayList,
    playlist: currentPlayList,
    random,
    toggleRandom,
  } = usePlayer();
  const palette = usePalette();

  const getPlayList = usePlayListStore(state => state.getPlayList);
  const playlist = getPlayList(id);
  const isCurrentPlayList = playlist.id === currentPlayList?.id;
  const isPlayingAsCurrentPlaylist = isPlaying && isCurrentPlayList;
  const isEmptyPlayList = playlist.songs.length === 0;

  const handlePlayPauseClick = () => {
    if (isEmptyPlayList) {
      return;
    }

    if (isPlayingAsCurrentPlaylist) {
      toggle();
      return;
    }

    setPlayList(playlist);
  };

  return (
    <Screen>
      <Header title={playlist?.name} />
      <FlexView style={{ marginBottom: 30, justifyContent: 'space-between' }}>
        <Button
          onPress={() => router.push(`/playlist/${playlist.id}/add-song`)}
          icon={<Feather name="plus" style={{ color: 'white' }} size={20} />}
        >
          Add Music
        </Button>
        <FlexView style={{ gap: 20 }}>
          <IconButton onPress={handlePlayPauseClick}>
            <AntDesign
              name="play"
              style={{
                color: isCurrentPlayList ? palette.primary : palette.text,
              }}
              size={35}
            />
          </IconButton>
          <IconButton onPress={toggleRandom}>
            <Ionicons
              name="shuffle"
              style={{ color: random ? palette.text : palette.primary }}
              size={35}
            />
          </IconButton>
        </FlexView>
      </FlexView>
      <SongList canPlay playlist={playlist} songs={playlist.songs} />
    </Screen>
  );
};
