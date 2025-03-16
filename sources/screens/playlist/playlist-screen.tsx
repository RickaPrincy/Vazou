import { FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { FlexView, Screen, ThemedText } from '@/components';
import { IconButton } from '@/components/buttons';
import { PlayLitsItem } from './components';
import { usePlayListStore } from '@/stores';
import { usePalette } from '@/themes';

export const PlayListScreen = () => {
  const router = useRouter();
  const palette = usePalette();
  const playlists = usePlayListStore(state => state.playlists);

  return (
    <Screen>
      <FlexView style={{ justifyContent: 'space-between', marginBottom: 10 }}>
        <ThemedText
          style={{ fontSize: 20, fontWeight: 'bold', color: palette.secondary }}
        >
          My Playlists
        </ThemedText>
        <IconButton
          onPress={() => router.push('/create-playlist')}
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
