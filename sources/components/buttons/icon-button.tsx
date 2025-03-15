import React, { FC } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export type IconButtonProps = TouchableOpacityProps;
export const IconButton: FC<IconButtonProps> = ({ children, ...props }) => {
  return <TouchableOpacity {...props}>{children}</TouchableOpacity>;
};
