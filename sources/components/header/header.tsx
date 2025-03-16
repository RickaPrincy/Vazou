import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

import { ThemedText } from '@/components';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { usePalette } from '@/themes';

const HEADER_STYLE: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
};

export const Header: FC<{ title: string }> = ({ title }) => {
  const palette = usePalette();
  const router = useRouter();

  return (
    <FlexView
      style={[
        HEADER_STYLE,
        {
          borderBottomColor: palette.border,
          backgroundColor: palette.background,
        },
      ]}
    >
      {router.canGoBack() ? (
        <IconButton onPress={() => router.back()}>
          <Feather
            name="arrow-left"
            color={palette.text}
            style={{ fontSize: 25 }}
          />
        </IconButton>
      ) : (
        <View style={{ width: 10 }} />
      )}

      <ThemedText
        style={{ fontSize: 16, fontWeight: 'bold', color: palette.text }}
      >
        {title}
      </ThemedText>
      <View style={{ width: 10 }} />
    </FlexView>
  );
};
