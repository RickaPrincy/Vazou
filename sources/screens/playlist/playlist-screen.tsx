import { FlatList, View } from 'react-native';
import { AntDesign, Feather, MaterialIcons } from '@expo/vector-icons';

import { FlexView, Screen, ThemedText } from '@/components';
import { Button, IconButton } from '@/components/buttons';
import { PlayLitsItem } from './components';
import { CreatePlayListModal } from './create-playlist-modal';
import { PlayList, usePlayListStore, useSheetModal } from '@/stores';
import { usePalette } from '@/themes';
import { useState } from 'react';

export const PlayListScreen = () => {
  const palette = usePalette();
  const playlists = usePlayListStore(state => state.playlists);
  const openSheetModal = useSheetModal(state => state.open);
  const deleteAll = usePlayListStore(state => state.deleteAllPlaylists);
  const [selectedPlaylist, setSelectedPlaylist] = useState<PlayList[]>([]);

  const openCreatePlayListModal = () =>
    openSheetModal(<CreatePlayListModal />, {
      containerStyle: { minHeight: 300, maxHeight: 300, height: 300 },
    });

  const togglePlayList = (candidate: PlayList) => {
    setSelectedPlaylist(prev =>
      prev.some(playlist => playlist.id === candidate.id)
        ? prev.filter(playlist => playlist.id !== candidate.id)
        : [...prev, candidate]
    );
  };

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
      {selectedPlaylist.length > 0 && (
        <View
          style={{
            backgroundColor: palette.card,
            borderRadius: 30,
            padding: 10,
            marginTop: 20,
          }}
        >
          <FlexView style={{ justifyContent: 'space-between' }}>
            <Button
              onPress={() => {
                deleteAll(selectedPlaylist);
                setSelectedPlaylist([]);
              }}
              style={{ backgroundColor: 'red' }}
              icon={<AntDesign color="white" size={20} name="delete" />}
            >
              <ThemedText
                style={{ fontSize: 12, color: 'white', textAlign: 'center' }}
              >
                Delete playlists
              </ThemedText>
            </Button>
            <IconButton onPress={() => setSelectedPlaylist([])}>
              <MaterialIcons
                name="clear"
                style={{ fontSize: 24, color: palette.secondary }}
              />
            </IconButton>
          </FlexView>
        </View>
      )}
      <FlatList
        data={playlists}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <PlayLitsItem
            selecteds={selectedPlaylist}
            togglePlayList={togglePlayList}
            playlist={item}
          />
        )}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 50 }}>
            <MaterialIcons name="music-off" size={40} color="#888" />
            <ThemedText
              style={{ textAlign: 'center', marginTop: 10, fontSize: 16 }}
            >
              Your playlist is empty
            </ThemedText>
          </View>
        }
      />
    </Screen>
  );
};
