import { FC, PropsWithChildren, ReactNode } from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, ViewStyle } from 'react-native';

import { usePalette } from '@/themes';
import { FlexView, ThemedText } from '@/components';

export type SettingsItemProps = PropsWithChildren<{
  onPress?: () => void;
  title: string;
  icon: ReactNode;
  right?: ReactNode;
}>;

const SETTINGS_ITEM_STYLE: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingVertical: 20,
  paddingHorizontal: 20,
  borderBottomWidth: 1,
  marginVertical: 5,
  borderRadius: 15,
};

export const SettingsItem: FC<SettingsItemProps> = ({
  onPress,
  title,
  icon,
  right,
}) => {
  const palette = usePalette();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        SETTINGS_ITEM_STYLE,
        {
          backgroundColor: palette.card,
          borderColor: palette.border,
        },
      ]}
    >
      <FlexView style={{ justifyContent: 'flex-start', gap: 10 }}>
        {icon}
        <ThemedText style={{ color: palette.text, fontSize: 16 }}>
          {title}
        </ThemedText>
      </FlexView>
      {right ?? (
        <Feather name="chevron-right" size={24} color={palette.secondary} />
      )}
    </TouchableOpacity>
  );
};
