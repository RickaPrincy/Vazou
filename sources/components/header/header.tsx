import { FC } from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
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

export const Header: FC<{
  headerStyle?: ViewStyle;
  showLeft?: boolean;
  title: string;
  titleStyle?: TextStyle;
}> = ({ title, titleStyle = {}, headerStyle = {}, showLeft = true }) => {
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
        headerStyle,
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
      ) : showLeft ? (
        <View style={{ width: 10 }} />
      ) : null}

      <ThemedText
        style={[
          { fontSize: 20, fontWeight: 'bold', color: palette.text },
          titleStyle,
        ]}
      >
        {title}
      </ThemedText>
      <View style={{ width: 10 }} />
    </FlexView>
  );
};
