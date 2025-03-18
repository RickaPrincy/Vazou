import { ReactNode } from 'react';
import { View, TextInput as NativeTextInput } from 'react-native';
import { Controller, useFormContext } from 'react-hook-form';

import { usePalette } from '@/themes';

export type TextInputProps = {
  name: string;
  placeholder: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

export const TextInput = ({
  name,
  placeholder,
  leftIcon,
  rightIcon,
}: TextInputProps) => {
  const { control } = useFormContext();
  const palette = usePalette();

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: palette.card,
        borderRadius: 15,
      }}
    >
      {leftIcon && <View style={{ marginRight: 10 }}>{leftIcon}</View>}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <NativeTextInput
            placeholderTextColor={'gray'}
            style={{
              fontSize: 16,
              color: palette.secondary,
              flex: 1,
            }}
            placeholder={placeholder}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {rightIcon && <View style={{ marginLeft: 10 }}>{rightIcon}</View>}
    </View>
  );
};
