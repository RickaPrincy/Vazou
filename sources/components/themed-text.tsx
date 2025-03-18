import { usePalette } from '@/themes';
import { FC } from 'react';
import { Text, TextProps } from 'react-native';

export const ThemedText: FC<TextProps> = ({ children, style, ...props }) => {
  const palette = usePalette();

  return (
    <Text
      style={[{ fontFamily: 'Poppins', color: palette.text }, style]}
      {...props}
    >
      {children}
    </Text>
  );
};
