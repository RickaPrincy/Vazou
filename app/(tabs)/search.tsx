import React, { useState } from 'react';
import { ActivityIndicator, Pressable, TextInput } from 'react-native';
import { Feather, Ionicons, MaterialIcons } from '@expo/vector-icons';

import { ThemedText, FlexView, Screen } from '@/components';
import { IconButton } from '@/components/buttons';
import { Header } from '@/components/header';
import { SongList } from '@/components/song-list';
import { useStateFetcher } from '@/hooks';
import { songsProvider } from '@/providers';
import { usePalette } from '@/themes';
import { useSearchSongStore } from '@/stores';
import { homeScreenStyles as styles } from '@/screens/home/styles';

export const Search = () => {
  const palette = usePalette();
  const { setValue: setSearchSongValue, value: searchSongValue } =
    useSearchSongStore();
  const { data: songs, isLoading } = useStateFetcher({
    defaultValue: [],
    fetcher: async () => await songsProvider.get(),
  });

  const [searchFilter, setSearchFilter] = useState<'artist' | 'title'>('title');

  const filteredSongs = songs.filter(song =>
    searchFilter === 'artist'
      ? song.artist?.toLowerCase().includes(searchSongValue.toLowerCase())
      : song.title.toLowerCase().includes(searchSongValue.toLowerCase())
  );

  return (
    <Screen>
      <Header title="Search" />
      <FlexView
        style={[
          styles.searchContainer,
          {
            backgroundColor: palette.card,
            borderRadius: 25,
            padding: 8,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 4,
          },
        ]}
      >
        <Feather
          name="search"
          style={{ fontSize: 24, color: palette.secondary, marginLeft: 10 }}
        />
        <TextInput
          value={searchSongValue}
          placeholderTextColor={palette.secondary}
          placeholder={
            searchFilter === 'artist' ? 'Find By Artist...' : 'Find By title...'
          }
          style={{
            flex: 1,
            fontSize: 15,
            color: palette.text,
            marginLeft: 10,
            paddingVertical: 5,
          }}
          onChangeText={setSearchSongValue}
        />
        {searchSongValue ? (
          <IconButton onPress={() => setSearchSongValue('')}>
            <Ionicons
              name="close"
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

      <FlexView
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginVertical: 10,
        }}
      >
        <Pressable
          onPress={() => setSearchFilter('artist')}
          style={{ alignItems: 'center', marginHorizontal: 20 }}
        >
          <MaterialIcons
            size={50}
            name="person"
            color={
              searchFilter === 'artist' ? palette.primary : palette.secondary
            }
          />
          <ThemedText
            style={{
              color:
                searchFilter === 'artist' ? palette.primary : palette.secondary,
            }}
          >
            Artist
          </ThemedText>
        </Pressable>

        <Pressable
          onPress={() => setSearchFilter('title')}
          style={{ alignItems: 'center', marginHorizontal: 20 }}
        >
          <MaterialIcons
            size={50}
            name="music-note"
            color={
              searchFilter === 'title' ? palette.primary : palette.secondary
            }
          />
          <ThemedText
            style={{
              color:
                searchFilter === 'title' ? palette.primary : palette.secondary,
            }}
          >
            Title
          </ThemedText>
        </Pressable>
      </FlexView>

      {isLoading ? (
        <ActivityIndicator
          color={palette.primary}
          size={40}
          style={{ marginTop: 20 }}
        />
      ) : (
        <SongList canPlay songs={filteredSongs} />
      )}
    </Screen>
  );
};

export default Search;
