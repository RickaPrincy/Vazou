import { FC } from 'react';
import { View, Text } from 'react-native';

import { Song } from '@/providers';

export const PlayListItem: FC<{ song: Song }> = ({ song }) => {
  return (
    <View>
      <Text>{song.filename}</Text>
    </View>
  );
};
