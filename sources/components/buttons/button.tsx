import { FC, ReactNode } from 'react';
import {
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { ThemedText } from '../themed-text';
import { usePalette } from '@/themes';

export type ButtonProps = TouchableOpacityProps & {
  textProps?: TextProps;
  icon?: ReactNode;
};

export const Button: FC<ButtonProps> = ({
  children,
  style = {},
  textProps = {},
  icon = null,
  ...props
}) => {
  const palette = usePalette();
  const { style: textStyle = {}, ...textOtherProps } = textProps;

  return (
    <TouchableOpacity
      style={[
        {
          gap: 10,
          paddingHorizontal: 8,
          paddingVertical: 10,
          borderRadius: 15,
          backgroundColor: palette.primary,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        style,
      ]}
      {...props}
    >
      {icon && icon}
      <ThemedText style={textStyle} {...textOtherProps}>
        {children}
      </ThemedText>
    </TouchableOpacity>
  );
};
