import { FC } from 'react';
import { useWindowDimensions, View, ViewProps } from 'react-native';
import { usePalette } from '@/themes';

export type ScreenProps = ViewProps;
export const Screen: FC<ScreenProps> = ({ children, style = {} }) => {
  const { width, height } = useWindowDimensions();
  const palette = usePalette();

  return (
    <View
      style={[{ width, height, backgroundColor: palette.background }, style]}
    >
      {children}
    </View>
  );
};
