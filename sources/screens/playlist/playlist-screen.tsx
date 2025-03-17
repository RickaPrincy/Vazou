import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { FlexView, Screen, ThemedText } from '@/components';
import { IconButton } from '@/components/buttons';
import { PlayLitsItem } from './components';
import { usePlayListStore, useSheetModal } from '@/stores';
import { usePalette } from '@/themes';
import { CreatePlayListModal } from './create-playlist-modal';

export const PlayListScreen = () => {
  const palette = usePalette();
  const playlists = usePlayListStore(state => state.playlists);
  const openSheetModal = useSheetModal(state => state.open);

  const openCreatePlayListModal = () => openSheetModal(<CreatePlayListModal />);

  return (
    <Screen>
      <FlexView style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <ThemedText
          style={{ fontSize: 20, fontWeight: 'bold', color: palette.secondary }}
        >
          My Playlists
        </ThemedText>
        <IconButton
          onPress={openCreatePlayListModal}
          style={{ marginLeft: 10 }}
        >
          <Feather name="plus" size={30} color={palette.text} />
        </IconButton>
      </FlexView>

      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <PlayLitsItem playlist={item} />}
        ListEmptyComponent={
          <ThemedText style={{ fontSize: 14 }}>No PlayList Yet</ThemedText>
        }
      />
    </Screen>
  );
};
