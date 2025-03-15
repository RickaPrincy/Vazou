import { FC } from 'react';
import { View } from 'react-native';

import { Song } from '@/providers';
import { ThemedText } from '../themed-text';

export const PlayListItem: FC<{ song: Song }> = ({ song }) => {
  return (
    <View>
      <ThemedText>{song.filename}</ThemedText>
    </View>
  );
};
