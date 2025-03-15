import { FC } from 'react';
import { View, ViewStyle } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { BottomTabHeaderProps } from '@react-navigation/bottom-tabs';

import { ThemedText } from '@/components';
import { FlexView } from '../flex-view';
import { IconButton } from '../buttons';
import { usePalette } from '@/themes';

const HEADER_STYLE: ViewStyle = {
  borderBottomWidth: 1,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  height: 55,
};

export const Header: FC<BottomTabHeaderProps> = ({ route, navigation }) => {
  const palette = usePalette();

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
      {navigation.canGoBack() ? (
        <IconButton onPress={() => navigation.goBack()}>
          <Feather
            name="arrow-left"
            color={palette.text}
            style={{ fontSize: 25 }}
          />
        </IconButton>
      ) : (
        <View style={{ width: 10 }} />
      )}

      <ThemedText style={{ color: palette.text }}>{route.name}</ThemedText>
      <View style={{ width: 10 }} />
    </FlexView>
  );
};
