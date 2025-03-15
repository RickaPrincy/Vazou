import { FC } from 'react';
import { usePalette } from '@/themes';
import {
  SafeAreaView,
  SafeAreaViewProps,
} from 'react-native-safe-area-context';

export type ScreenProps = SafeAreaViewProps;
export const Screen: FC<ScreenProps> = ({ children, style = {}, ...props }) => {
  const palette = usePalette();

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor: palette.background }, style]}
      {...props}
    >
      {children}
    </SafeAreaView>
  );
};
