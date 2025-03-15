import { FC, PropsWithChildren } from 'react';
import { View } from 'react-native';
import { ThemedText } from '@/components';
import { usePalette } from '@/themes';

export type SettingsSectionProps = PropsWithChildren<{
  title: string;
}>;

export const SettingsSection: FC<SettingsSectionProps> = ({
  children,
  title,
}) => {
  const palette = usePalette();
  return (
    <View style={{ paddingVertical: 10 }}>
      <ThemedText
        style={{
          color: palette.secondary,
          paddingHorizontal: 20,
          fontSize: 16,
          fontWeight: 'bold',
        }}
      >
        {title}
      </ThemedText>
      <View>{children}</View>
    </View>
  );
};
