import React from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { ThemedText, FlexView, Screen } from '@/components';
import { IconButton } from '@/components/buttons';
import { SongList } from '@/components/song-list';
import { useStateFetcher } from '@/hooks';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';
import { useConfigStore, usePlayer, useSearchSongStore } from '@/stores';
import { filterSongs } from '@/utils/filter-songs';
import { homeScreenStyles as styles } from './styles';
import { NOOP_FN } from '@/utils/noop-fn';

export const HomeScreen = () => {
  const palette = usePalette();
  const user = useConfigStore(state => state.user);
  const setSong = usePlayer(state => state.setSong);
  const { setValue: setSearchSongValue, value: searchSongValue } =
    useSearchSongStore();

  const { data: songs, isLoading } = useStateFetcher({
    defaultValue: [],
    fetcher: async () => await songsProvider.get(),
  });

  const filteredSongs = filterSongs(searchSongValue, songs);

  return (
    <Screen>
      <FlexView style={styles.headerContainer}>
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{ fontSize: 10, color: palette.secondary }}>
            Welcome to
          </ThemedText>
          <ThemedText
            style={{
              fontSize: 18,
              color: palette.secondary,
              fontWeight: 'bold',
            }}
          >
            Vazou Music
          </ThemedText>
        </View>
        <Pressable onPress={NOOP_FN}>
          <FlexView
            style={[styles.avatarContainer, { backgroundColor: palette.text }]}
          >
            <Image
              source={user.avatarUri}
              style={[styles.avatarImage, { borderColor: palette.card }]}
            />
          </FlexView>
        </Pressable>
      </FlexView>

      <FlexView
        style={[styles.searchContainer, { backgroundColor: palette.card }]}
      >
        <FlexView style={{ gap: 10 }}>
          <Feather
            name="search"
            style={{ fontSize: 24, color: palette.secondary }}
          />
          <TextInput
            value={searchSongValue}
            placeholderTextColor="gray"
            placeholder="Nom de la playlist"
            style={{ color: palette.text }}
            onChangeText={setSearchSongValue}
          />
        </FlexView>
        {searchSongValue ? (
          <IconButton onPress={() => setSearchSongValue('')}>
            <MaterialIcons
              name="clear"
              style={{ color: palette.secondary, fontSize: 24 }}
            />
          </IconButton>
        ) : (
          <IconButton>
            <Ionicons
              name="filter"
              style={{ color: palette.secondary, fontSize: 24 }}
            />
          </IconButton>
        )}
      </FlexView>
      {isLoading ? (
        <ActivityIndicator
          color={palette.primary}
          size={40}
          style={{ marginTop: 20 }}
        />
      ) : (
        <SongList
          canPlay
          onPress={song => {
            setSong(song);
            router.push('/play-view');
          }}
          songs={filteredSongs}
        />
      )}
    </Screen>
  );
};
